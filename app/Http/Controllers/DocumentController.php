<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function printCalculation($id)
    {
        $calculation = Calculation::with(['organization', 'customer'])->find($id);

        $pdf = Pdf::loadView('documents/calculation', compact('calculation'));
        // return view('documents/calculation', compact('calculation'));
        return $pdf->stream();
    }
}
