<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationUpdateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>+
   */
  public function rules(): array
  {
    return [
      'name' => ['required', 'string', 'max:255'],
      'type' => ['nullable', 'integer', 'exists:organization_types,id'],
      'logo' => ['nullable', 'image', 'max:2048'],
      'website' => ['nullable', 'string', 'max:255'],
      'email' => ['nullable', 'email', 'max:255'],
      'establishment_date' => ['nullable', 'date'],
      'commercial_register_number' => ['nullable', 'string', 'max:255'],

    ];
  }
}
