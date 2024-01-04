<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required',
            'mobile' => 'required',
            'status' => 'required',
            'owner_name' => 'required',
            'owner_mobile' => 'required',
            'division_id'=> 'required',
            'district_id'=> 'required',
            'zone_id'=> 'required',
            'address'=> 'required',
            'trade_license'=> 'required',
            'business_type'=> 'required'
        ];
        
    }
}
