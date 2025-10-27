<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Throwable;

class QdrantService
{
    private string $baseUrl;

    private ?string $apiKey;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('qdrant.host', 'http://localhost:6333'), '/');
        $this->apiKey  = config('qdrant.api_key', null);
    }

    public function upsertPoints(string $collection, array $points): array
    {
        try {
            $response = Http::withHeaders(array_filter([
                'X-API-Key'    => $this->apiKey,
                'Content-Type' => 'application/json',
            ]))
                ->timeout(10)
                ->post("{$this->baseUrl}/collections/{$collection}/points", [
                    'points' => $points,
                ]);

            return $response->json() ?? [];
        } catch (Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public static function makePoint($id, array $vector, ?array $payload = null): array
    {
        $point = ['id' => $id, 'vector' => $vector];

        if ($payload !== null) {
            $point['payload'] = $payload;
        }

        return $point;
    }
}
