<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'mobile',
        'status',
        'owner_name',
        'owner_mobile',
        'country_id',
        'division_id',
        'district_id',
        'zone_id',
        'address',
        'trade_license',
        'business_type',
        'description'
    ];
}
