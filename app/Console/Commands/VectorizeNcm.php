<?php

namespace App\Console\Commands;

use App\Models\Ncm;
use App\Services\{OpenAiService, QdrantService};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Throwable;

class VectorizeNcm extends Command
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService)
    {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:vectorize-ncm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command for vectorize all NCMs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ncms = Ncm::whereNull('embedding_status')
            ->orWhereIn('embedding_status', ['error', 'pending'])
            ->lazyById(1000);

        foreach ($ncms as $ncm) {
            try {
                $vector = $this->openAiService->createVector($ncm->description);

                if (empty($vector) || !is_array($vector) || count($vector) === 0) {
                    $ncm->update(['embedding_status' => 'error']);

                    continue;
                }

                $point = $this->qdrantService->makePoint($ncm->id, $vector, [
                    'ncm_code'    => $ncm->ncm_code,
                    'description' => $ncm->description,
                    'ex'          => $ncm->ex,
                    'NT'          => $ncm->NT,
                    'aliquot'     => $ncm->aliquot,
                    'parent_id'   => $ncm->parent_id,
                    'created_at'  => $ncm->created_at?->toDateTimeString(),
                ]);

                $qdrantPoint = $this->qdrantService->upsertPoints('ncm', [$point]);

                if ($qdrantPoint['status'] !== 'ok') {
                    $ncm->update(['embedding_status' => 'error']);

                    Log::error('Erro ao inserir ponto no Qdrant', [
                        'ncm_id'   => $ncm->id,
                        'response' => $qdrantPoint,
                    ]);

                    continue;

                }

                $ncm->update(['embedding_status' => 'done']);

            } catch (Throwable $e) {
                $ncm->update(['embedding_status' => 'error']);

                Log::error('Erro ao vetorizar NCM', [
                    'ncm_id'  => $ncm->id,
                    'message' => $e->getMessage(),
                ]);

                continue;
            }
        }
    }
}
