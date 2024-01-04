<?php

namespace App\Http\Controllers\api;

use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubcategoryListResource;

class SubCategoryController extends Controller
{

    public function index(Request $request){
        
        $query = SubCategory::query();
        $query = $query->with('createdBy:id,name','category:id,name');
        $query = $query->when($request->search != '', function($q) use($request){
            $q->where('name','like','%'.$request->search.'%');
        });
       
        $sub_categories =  $query->paginate($request->per_page ? $request->per_page : 10 );
        return SubcategoryListResource::collection($sub_categories) ;

    }

    public function edit($id){
        $s_category = SubCategory::find($id);
        return new SubCategoryEditResource($s_category);
     }

    public function store(SubCategoryRequest $request){
        $data = $request->except('image');
        $data['created_by'] = auth()->id();
        $data['slug'] = Str::slug($request->slug);
        $name = $data['name'];
        $path= "uploads/image/sub_category/main/";
        $thum_path = "uploads/image/sub_category/thumbs/";
        if($request->has('image')){
            uploadImage($name,120,120,$thum_path,$request->image);
            $data['photo']  = uploadImage($name,300,300,$path,$request->image); 
        }
        SubCategory::create($data);
        return response()->json(['msg'=> 'Sub Category Added Successfully','cls'=>'success'],200);
    }

    public function update(UpdateSubCategoryRequest $request){
        $s_category = SubCategory::find($request->id);
        if($s_category && $s_category->photo){
            deletePhoto(asset('/public/uploads/image/sub_category/thumbs/'.$s_category->photo));
            deletePhoto(asset('/public/uploads/image/sub_category/main/'.$s_category->photo));
        }
        $data = $request->except(['image','photo']);
        $data['created_by'] = auth()->id();
        $data['slug'] = Str::slug($request->slug);
        $name = $data['name'];
        $path= "uploads/image/category/main/";
        $thum_path = "uploads/image/category/thumbs/";
        if($request->has('image') && !empty($request->image)){
            uploadImage($name,120,120,$thum_path,$request->image);
            $data['photo']  = uploadImage($name,300,300,$path,$request->image); 
        }
        $s_category->update($data);
        return response()->json(['msg'=> 'SubCategory Update Successfully','cls'=>'success'],200);
    }

    public function delete($id){
        $s_category = SubCategory::find($id);
        if($s_category->photo){
             deletePhoto(asset('/public/uploads/image/category/thumbs/'.$s_category->photo));
             deletePhoto(asset('/public/uploads/image/category/main/'.$s_category->photo));
         }
         $s_category->delete();
         return response()->json(['msg'=> 'Sub Category Deleted Successfully','cls'=>'success'],200);
     }
}