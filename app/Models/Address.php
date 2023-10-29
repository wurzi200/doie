<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Address extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'addresses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'street',
        'postal_code',
        'city',
        'state',
        'zip',
        'country',
    ];

    public function customers(): MorphToMany
    {
        return $this->morphedByMany(Customer::class, 'model', 'model_has_addresses', 'model_id', 'address_id');
    }

    public function organizations(): MorphToMany
    {
        return $this->morphedByMany(Customer::class, 'model', 'model_has_addresses', 'model_id', 'address_id');
    }
}
