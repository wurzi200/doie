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

    protected $fillable = [
        'name',
        'type',
        'logo',
        'website',
        'email',
        'establishment_date',
        'commercial_register_number',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'organization_id', 'id');
    }

    public function role(): HasMany
    {
        return $this->hasMany(Role::class, 'organization_id', 'id');
    }

    public function calculations()
    {
        return $this->hasMany(Calculation::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function organizationType()
    {
        return $this->belongsTo(OrganizationType::class);
    }
}
