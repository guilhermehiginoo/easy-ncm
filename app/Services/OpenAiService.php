<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class OpenAiService
{
    public function createVector(string $data)
    {
        $vector = OpenAI::embeddings()->create([
            'model' => 'text-embedding-3-small',
            'input' => $data,
        ]);

        return $vector->embeddings[0]->embedding;
    }
}
