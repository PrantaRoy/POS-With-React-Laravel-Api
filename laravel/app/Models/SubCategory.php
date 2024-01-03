<?php

namespace App\Models;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
        'slug',
        'status',
        'description',
        'photo',
        'created_by'
    ];

    public function createdBy(){
        return $this->belongsTo(User::class,'created_by','id');
    }
    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }
}
