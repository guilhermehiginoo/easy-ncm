<?php

namespace App\Http\Controllers;

use App\Models\Ncm;

class NcmController extends Controller
{
    public function index()
    {
        $ncms = Ncm::orderBy('id', 'asc')->paginate(20);

        return view('ncm.index', compact('ncms'));
    }


    public function show(string $id)
    {
        //
    }

}
