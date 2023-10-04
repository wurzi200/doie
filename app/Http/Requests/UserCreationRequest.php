<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserCreationRequest extends FormRequest
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
      'lastname' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
      'organization_id' => ['required'],
      'password' => ['required', 'confirmed', Password::defaults()],
    ];
  }
}
