<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'customer_dni', 
        'product', 
        'subproduct', 
        'maintenance', 
        'state',
        'subproduct_gas',
        'maintenance_light',
        'maintenance_gas'
    ];
}
