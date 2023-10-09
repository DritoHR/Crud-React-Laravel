<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $surveys = Survey::paginate(8);
        return $surveys;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'customer_dni' => 'required|regex:/^[0-9]{8}[A-Z]$/',
                'product' => 'required|string',
                'subproduct' => 'required|string',
                'maintenance' => ($request->input('product') === 'DUAL') ? 'nullable' : 'sometimes|string',
                'state' => 'required|string',
                'subproduct_gas' => ($request->input('product') === 'DUAL') ? 'nullable|required|string' : 'nullable|string',
                'maintenance_light' => ($request->input('product') === 'DUAL') ? 'nullable|required|string' : 'nullable|string',
                'maintenance_gas' => ($request->input('product') === 'DUAL') ? 'nullable|required|string' : 'nullable|string',
            ]);
            

            $survey = new Survey($validatedData);
            $survey->save();

            return response()->json(['message' => 'Survey saved successfully'], 201);
            
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Errors',
                'errors' => $e->validator->errors()
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $survey = Survey::find($id);
        return $survey;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'customer_dni' => 'required|string|max:9',
            'product' => 'required|string',
            'subproduct' => 'required|string',
            'subproduct_gas' => 'sometimes|nullable|string',
            'maintenance' => 'sometimes|nullable|string',
            'state' => 'required|string',
            'maintenance_light' => 'sometimes|nullable|string',
            'maintenance_gas' => 'sometimes|nullable|string',
        ]);

        $survey = Survey::findOrFail($id);
        $survey->fill($validatedData);
        $survey->save();

        return response()->json(['message' => 'Survey updated successfully!', 'survey' => $survey]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $survey = Survey::destroy($id);
        return $survey;
    }
}
