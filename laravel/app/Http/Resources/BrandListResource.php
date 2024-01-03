<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandListResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'status' => $this->status ==1 ? 'Active' : 'InActive',
            'logo' =>  asset('/public/uploads/image/brand/logo/'.$this->logo),
            'created_by' => @$this->createdBy->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'description' => $this->description,
        ] ;
    }
    
}
