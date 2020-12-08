<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function postUrls()
    {
        return $this->hasMany(PostUrl::class);
    }

    public function rePosts()
    {
        return $this->hasMany(PostUrl::class, 'from_post');
    }
}
