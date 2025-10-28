<?php

namespace App\Http\Controllers;

use App\Models\Ncm;
use App\Services\OpenAiService;
use App\Services\QdrantService;
use Throwable;

class VectorController extends Controller
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService)
    {
    }

    public function vectorizeNcm()
    {
        $ncms = Ncm::whereNull('embedding_status')
            ->orWhereIn('embedding_status', ['error', 'pending'])
            ->lazyById(1000);


        foreach ($ncms as $ncm) {
            try {
                $vector = $this->openAiService->createVector($ncm->description);

                $point = QdrantService::makePoint($ncm->id, $vector, [
                    'ncm_code'    => $ncm->ncm_code,
                    'description' => $ncm->description,
                    'ex'          => $ncm->ex,
                    'NT'          => $ncm->NT,
                    'aliquot'     => $ncm->aliquot,
                    'parent_id'   => $ncm->parent_id,
                ]);

                $this->qdrantService->upsertPoints('ncm', [$point]);

                $ncm->update([
                    'embedding_status' => $vector ? 'done' : 'error',
                ]);
            } catch (Throwable) {
                $ncm->update(['embedding_status' => 'error']);
            }
        }

        return response()->json(['message' => 'Vectorization process finished.'], 200);
    }
}
