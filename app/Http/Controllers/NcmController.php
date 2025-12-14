<?php

namespace App\Http\Controllers;

use App\Models\Ncm;
use App\Services\{NcmService, OpenAiService, QdrantService};
use Illuminate\Http\Request;

class NcmController extends Controller
{
    public function __construct(protected OpenAiService $openAiService, protected QdrantService $qdrantService, protected NcmService $ncmService)
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

        return $this->ncmService->queryNcm($request->input('query'));
    }
}
