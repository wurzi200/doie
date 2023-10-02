<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>+
   */
  public function rules(): array
  {
    return [
      'name' => ['string', 'max:255'],
      'lastname' => ['string', 'max:255'],
      'organization_id' => ['integer'],
      'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
    ];
  }
}
