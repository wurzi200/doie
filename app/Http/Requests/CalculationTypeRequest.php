<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculationTypeRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>+
   */

  public function rules()
  {
    return [
      'name' => 'required|string|max:255',
      'minCost' => 'required|numeric',
      'maxCost' => 'required|numeric',
      'minSpecial' => 'required|numeric',
      'maxSpecial' => 'required|numeric',
      'minResidual' => 'required|numeric',
      'maxResidual' => 'required|numeric',
      'minInterest' => 'required|numeric',
      'maxInterest' => 'required|numeric',
      'minDuration' => 'required|numeric',
      'maxDuration' => 'required|numeric',
      'type' => 'required|integer|max:255',
    ];
  }
}
