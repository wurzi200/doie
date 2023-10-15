<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calculation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'organization_id',
        'cost',
        'duration',
        'interest',
        'residual',
        'special',
        'calculationType',
        'rate'
    ];

    public function calculationType()
    {
        return $this->belongsTo(CalculationType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
