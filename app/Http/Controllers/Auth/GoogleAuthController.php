<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\{App, Auth};

class GoogleAuthController extends Controller
{
    /**
     * Redireciona para o Google OAuth
     */
    public function redirect(): RedirectResponse
    {
        // Verifica se as credenciais estão configuradas
        $clientId     = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');

        if (empty($clientId) || empty($clientSecret)) {
            return redirect()->route('login')
                ->with('error', 'Configuração do Google OAuth não encontrada. Verifique as variáveis GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no arquivo .env');
        }

        try {
            $socialite = App::make(\Laravel\Socialite\Contracts\Factory::class);

            // Usa a URI configurada ou a rota correta
            $redirectUri = config('services.google.redirect');

            if (empty($redirectUri)) {
                $redirectUri = url('/auth/google/callback');
            }

            return $socialite->driver('google')
                ->redirectUrl($redirectUri)
                ->redirect();
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Erro ao redirecionar para Google: ' . $e->getMessage());
        }
    }

    /**
     * Handle callback do Google OAuth
     */
    public function callback(): RedirectResponse
    {
        try {
            $socialite = App::make(\Laravel\Socialite\Contracts\Factory::class);

            // Usa a URI configurada ou a rota correta
            $redirectUri = config('services.google.redirect');

            if (empty($redirectUri)) {
                $redirectUri = url('/auth/google/callback');
            }

            $googleUser = $socialite->driver('google')
                ->redirectUrl($redirectUri)
                ->user();

            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            if ($user) {
                // Se o usuário existe mas não tem google_id, atualiza
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar'    => $googleUser->getAvatar(),
                    ]);
                } else {
                    // Atualiza o avatar caso tenha mudado
                    $user->update([
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                }
            } else {
                // Cria novo usuário
                $user = User::create([
                    'name'              => $googleUser->getName(),
                    'email'             => $googleUser->getEmail(),
                    'google_id'         => $googleUser->getId(),
                    'avatar'            => $googleUser->getAvatar(),
                    'email_verified_at' => now(), // Google já verifica o email
                    'password'          => bcrypt(uniqid()), // Senha aleatória, já que não será usada
                ]);
            }

            Auth::login($user);

            return redirect()->intended(route('classify.index', absolute: false));
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            return redirect()->route('login')
                ->with('error', 'Sessão expirada. Por favor, tente fazer login novamente.');
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            $statusCode = $e->getResponse()->getStatusCode();

            if ($statusCode === 401) {
                return redirect()->route('login')
                    ->with('error', 'Credenciais do Google OAuth inválidas. Verifique o Client ID e Client Secret no Google Cloud Console.');
            }

            return redirect()->route('login')
                ->with('error', 'Erro de comunicação com Google: ' . $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Erro ao fazer login com Google: ' . $e->getMessage());
        }
    }
}
