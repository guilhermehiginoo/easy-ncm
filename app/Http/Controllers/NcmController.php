<?php

namespace App\Http\Controllers;

use App\Models\Ncm;
use App\Services\{OpenAiService, QdrantService};
use Exception;
use Illuminate\Http\Request;

class NcmController extends Controller
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService)
    {
    }

    public function index()
    {
        $ncms = Ncm::orderBy('id', 'asc')->paginate(20);

        return view('ncm.index', compact('ncms'));
    }

    public function show(string $id)
    {
        //
    }

    public function vectorSearch(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:500',
        ]);

        try {
            $vector = $this->openAiService->createVector($request->input('query'));

            if (empty($vector)) {
                return back()->withErrors(['error' => 'Failed to create embedding vector for the query.']);
            }

            $searchResults = $this->qdrantService->searchPoints($vector, 'ncm', 20);

            if ($searchResults['status'] !== 'ok') {
                return back()->withErrors(['error' => 'Error from Qdrant: ' . $searchResults['error']]);
            }

            return $searchResults['result'] ?? [];

        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error trying to search NCM codes: ' . $e->getMessage()]);
        }
    }

}
