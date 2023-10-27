<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelHasAddress extends Model
{
    protected $table = 'model_has_addresses';

    protected $fillable = [
        'address_id',
        'model_type',
        'model_id',
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function model()
    {
        return $this->morphTo();
    }
}
