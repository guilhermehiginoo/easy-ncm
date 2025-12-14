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

    public function chooseNcm(string $description, array $ncmOptions)
    {
        $optionsText = '';

        foreach ($ncmOptions as $option) {
            $optionsText .= "-NCM ID: {$option['ncm_id']} NCM Code: {$option['ncm_code']}, Description: {$option['description']}\n";
        }

        $prompt = <<<PROMPT
                Você é um especialista em classificação fiscal de mercadorias segundo a
                Nomenclatura Comum do Mercosul (NCM).

                Descrição do produto:
                "{$description}"

                Abaixo está uma lista de opções possíveis de NCM:
                {$optionsText}

                Tarefa:
                Analise cuidadosamente a descrição do produto e selecione APENAS os códigos NCM
                que sejam realmente compatíveis com o produto descrito.

                Responda exclusivamente com um array JSON.
                Cada item do array deve conter exatamente a seguinte estrutura:

                {
                  "ncm_code": "Código NCM selecionado",
                  "ncm_description": "Descrição oficial do NCM",
                  "ncm_justification": "Justificativa técnica e objetiva para a escolha do NCM"
                }

                Regras importantes:
                - Inclua apenas NCMs que sejam diretamente aplicáveis à descrição.
                - Se apenas um NCM for adequado, retorne um array com um único item.
                - Se nenhum NCM da lista for compatível, retorne um array vazio ([]).
                - Não invente códigos ou descrições.
                - Não inclua texto fora do JSON.
                - Responda sempre em português.
                PROMPT;

        $response = OpenAI::responses()->create([
            'model'       => 'gpt-4.1-mini',
            'input'       => $prompt,
            'temperature' => 0.6,

            'text' => [
                'format' => [
                    'name' => 'relevant_ncms',
                    'type' => 'json_schema',

                    'schema' => [
                        'type' => 'object',

                        'properties' => [
                            'ncms' => [
                                'type' => 'array',

                                'items' => [
                                    'type' => 'object',

                                    'properties' => [
                                        'ncm_id' => [
                                            'type' => 'integer',
                                        ],
                                        'ncm_description' => [
                                            'type' => 'string',
                                        ],
                                        'ncm_code' => [
                                            'type' => 'string',
                                        ],
                                        'ncm_justification' => [
                                            'type' => 'string',
                                        ],
                                    ],

                                    'required' => [
                                        'ncm_id',
                                        'ncm_description',
                                        'ncm_code',
                                        'ncm_justification',
                                    ],

                                    'additionalProperties' => false,
                                ],
                            ],
                        ],

                        'required'             => ['ncms'],
                        'additionalProperties' => false,
                    ],
                ],
            ],
        ]);

        $response = json_decode($response['output'][0]['content']['0']['text']);

        return $response;
    }
}
