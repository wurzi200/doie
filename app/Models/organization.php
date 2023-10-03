<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User;
use Spatie\Permission\Models\Role;

class Organization extends Model
{
    use HasFactory;

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'organization_id', 'id');
    }

    public function role(): HasMany
    {
        return $this->hasMany(Role::class, 'organization_id', 'id');
    }
}
