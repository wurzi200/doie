<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Customer extends Model
{
    use HasFactory;

    public function addresses(): MorphToMany
    {
        return $this->morphToMany(Address::class, 'model', 'model_has_addresses', 'model_id', 'address_id');
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
