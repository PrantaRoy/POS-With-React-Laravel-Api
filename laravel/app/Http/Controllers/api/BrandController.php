<?php

namespace App\Http\Controllers\api;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\BrandRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\BranUpdatedRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandListResource;

class BrandController extends Controller
{

    public function index(Request $request){

        $query = Brand::query();
        $query = $query->with('createdBy:id,name');
        $query = $query->when($request->search != '', function($q) use($request){
            $q->where('name','like','%'.$request->search.'%');
        });
        // $query->when($request->order_by, function($q) use($request){
        //     $q->where('name','like','%'.$request->name.'%');
        // });
        // $query->when($request->sort_by, function($q) use($request){
        //     $q->where('name','like','%'.$request->name.'%');
        // });
        

        $brands =  $query->paginate($request->per_page ? $request->per_page : 10 );
        return BrandListResource::collection($brands) ;

    }
    public function store(BrandRequest $request){
        $data = $request->except('logo');
        $data['created_by'] = auth()->id();
        $data['slug'] = Str::slug($request->slug);
        $name = $data['name'];
        $path= "uploads/image/brand/logo/";
        if($request->has('logo')){
            $data['logo']  = uploadImage($name,300,300,$path,$request->logo); 
        }
        Brand::create($data);
        return response()->json(['msg'=> 'Brand Added Successfully','cls'=>'success'],200);
    }


    public function delete($id){
        $brand = Brand::find($id);
        if($brand->logo){
             deletePhoto(asset('/public/uploads/image/brand/tlogo/'.$brand->logo));
         }
         $brand->delete();
         return response()->json(['msg'=> 'Brand Deleted Successfully','cls'=>'success'],200);
     }


     public function edit($id){
        $brand = Brand::find($id);
        return new BrandEditResource($brand);
     }

     public function update(BranUpdatedRequest $request){
        $brand = Brand::find($request->id);
        if($brand && $brand->logo){
            deletePhoto(asset('/public/uploads/image/brand/logo/'.$brand->logo));
        }
        $data = $request->except(['logo']);
        $data['created_by'] = auth()->id();
        $data['slug'] = Str::slug($request->slug);
        $name = $data['name'];
        $path= "uploads/image/brand/logo/";
        if($request->has('image') && !empty($request->image)){
            $data['logo']  = uploadImage($name,300,300,$path,$request->image); 
        }
        $brand->update($data);
        return response()->json(['msg'=> 'Brand Update Successfully','cls'=>'success'],200);
    }
}
