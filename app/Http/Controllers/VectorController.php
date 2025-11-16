<?php

namespace App\Http\Controllers;

use App\Models\Ncm;
use App\Services\{OpenAiService, QdrantService};
use Throwable;

class VectorController extends Controller
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService)
    {
    }

    public function vectorizeNcm(Ncm $ncm)
    {
        try {
            $vector = $this->openAiService->createVector($ncm->description);

            if (empty($vector) || !is_array($vector) || count($vector) === 0) {
                $ncm->update(['embedding_status' => 'error']);

                return response()->json(['message' => 'Failed to create embedding vector.'], 500);
            }

            $point = $this->qdrantService->makePoint($ncm->id, $vector, [
                'ncm_code'    => $ncm->ncm_code,
                'description' => $ncm->description,
                'ex'          => $ncm->ex,
                'NT'          => $ncm->NT,
                'aliquot'     => $ncm->aliquot,
                'parent_id'   => $ncm->parent_id,
            ]);

            $pointRequest = $this->qdrantService->upsertPoints('ncm', [$point]);

            if ($pointRequest['status'] !== 'ok') {
                $ncm->update(['embedding_status' => 'error']);

                return response()->json(['message' => 'Error from Qdrant: ' . $pointRequest['error']], 500);
            }

            $ncm->update([
                'embedding_status' => 'done',
            ]);
        } catch (Throwable) {
            $ncm->update(['embedding_status' => 'error']);
        }

        return response()->json(['message' => 'Vectorization process finished.']);
    }
}
