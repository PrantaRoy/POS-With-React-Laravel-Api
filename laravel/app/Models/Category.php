<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'status',
        'description',
        'photo',
        'created_by'
    ];


    public function createdBy(){
        return $this->belongsTo(User::class,'created_by','id');
    }
}
