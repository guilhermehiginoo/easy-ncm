<?php

namespace App\Http\Controllers;

use App\Models\Classification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassifyController extends Controller
{
    /**
     * Display the classify page with recent history.
     */
    public function index()
    {
        $recentHistory = Classification::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($classification) {
                return [
                    'id'         => $classification->id,
                    'title'      => $classification->product_description,
                    'product'    => $classification->product_description,
                    'ncm'        => $classification->ncm_code,
                    'created_at' => $classification->created_at,
                    'date'       => $classification->created_at->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Classify', [
            'recentHistory' => $recentHistory,
        ]);
    }

    /**
     * Classify a product and return NCM code.
     */
    public function classify(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:1000',
        ]);

        // Aqui você implementaria a lógica de classificação com IA
        // Por enquanto, vou simular uma resposta
        $ncmCode = $this->classifyWithAI($request->description);

        // Salvar no banco de dados
        $classification = Classification::create([
            'user_id'             => auth()->id(),
            'product_description' => $request->description,
            'ncm_code'            => $ncmCode['ncm'],
            'tipi_code'           => $ncmCode['tipi'],
            'justification'       => $ncmCode['justification'],
        ]);

        return back()->with([
            'classification' => [
                'ncm'           => $ncmCode['ncm'],
                'tipi'          => $ncmCode['tipi'],
                'justification' => $ncmCode['justification'],
            ],
        ]);
    }

    /**
     * Simulate AI classification (replace with actual AI integration).
     */
    private function classifyWithAI(string $description)
    {
        // TODO: Integrar com API de IA para classificação real
        // Por enquanto, retorna um exemplo
        return [
            'ncm'           => '8517.12.31',
            'tipi'          => '8517.12',
            'justification' => 'Classificação baseada na descrição do produto: ' . substr($description, 0, 100),
        ];
    }
}
