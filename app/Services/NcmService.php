<?php

namespace App\Services;

class NcmService
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService)
    {
    }

    public function queryNcm($query)
    {
        $vector = $this->openAiService->createVector($query);

        if (empty($vector)) {
            return back()->withErrors(['error' => 'Failed to create embedding vector for the query.']);
        }

        $searchResults = $this->qdrantService->searchPoints($vector, 'ncm', 20);

        if ($searchResults['status'] !== 'ok') {
            return back()->withErrors(['error' => 'Error from Qdrant: ' . $searchResults['error']]);
        }

        $formattedArray = null;

        foreach ($searchResults['result']['points'] as $point) {
            $formattedArray[] = [
                'ncm_id'      => $point['id'],
                'ncm_code'    => $point['payload']['ncm_code'] ?? null,
                'description' => $point['payload']['description'] ?? null,
            ];
        }

        $relevantNcms = $this->openAiService->chooseNcm($query, $formattedArray);

        return $relevantNcms ?? [];
    }
}
