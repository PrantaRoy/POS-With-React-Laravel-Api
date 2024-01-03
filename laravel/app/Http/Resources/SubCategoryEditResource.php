<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'status' => $this->status,
            'photo' =>  asset('/public/uploads/image/sub_category/thumbs/'.$this->photo),
            'main_photo' =>  asset('/public/uploads/image/sub_category/main/'.$this->photo),
            'created_by' => @$this->createdBy->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'description' => $this->description,
        ];
    }
}
