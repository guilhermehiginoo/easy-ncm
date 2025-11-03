<?php

namespace App\Http\Controllers;

use App\Models\Classification;
use Inertia\Inertia;

class HistoryController extends Controller
{
    /**
     * Display the history page with all classifications.
     */
    public function index()
    {
        $history = Classification::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($classification) {
                return [
                    'id'         => $classification->id,
                    'product'    => $classification->product_description,
                    'ncm'        => $classification->ncm_code,
                    'created_at' => $classification->created_at,
                    'date'       => $classification->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('History', [
            'history' => $history,
        ]);
    }

    /**
     * Show details of a specific classification.
     */
    public function show($id)
    {
        $classification = Classification::where('user_id', auth()->id())
            ->findOrFail($id);

        return Inertia::render('HistoryDetail', [
            'classification' => [
                'id'            => $classification->id,
                'product'       => $classification->product_description,
                'ncm'           => $classification->ncm_code,
                'tipi'          => $classification->tipi_code,
                'justification' => $classification->justification,
                'created_at'    => $classification->created_at,
            ],
        ]);
    }
}
