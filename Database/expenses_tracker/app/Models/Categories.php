<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    //
    protected $table = "categories";

    protected $fillable = [
        'user_id', 'category_title', 'budget',
    ];

    protected $casts = [
        'budget' => 'array'
    ];
}
