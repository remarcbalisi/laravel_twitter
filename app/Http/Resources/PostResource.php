<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'user' => new UserResource($this->user),
            'comments' => $this->comments()->with('post.user', 'user')->get(),
            'post_urls' => $this->postUrls,
            're_posts' => $this->rePosts,
            'images' => $this->images,
        ];
    }
}
