<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public function addresses()
    {
        return $this->hasMany(Address::class);
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
