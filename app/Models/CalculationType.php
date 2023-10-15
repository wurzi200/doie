<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalculationType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'minCost',
        'maxCost',
        'minSpecial',
        'maxSpecial',
        'minResidual',
        'maxResidual',
        'minInterest',
        'maxInterest',
        'minDuration',
        'maxDuration',
        'type',
        'organization_id',
    ];

    public function calculations()
    {
        return $this->hasMany(Calculation::class);
    }
}
