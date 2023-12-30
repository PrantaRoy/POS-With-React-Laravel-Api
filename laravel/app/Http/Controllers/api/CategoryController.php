<?php

namespace App\Http\Controllers\api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryListResource;

class CategoryController extends Controller
{

    public function index(Request $request){

        $query = Category::query();
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
        

        $categories =  $query->paginate($request->per_page ? $request->per_page : 10 );
        return CategoryListResource::collection($categories) ;

    }
    public function store(CategoryRequest $request){

        $data = $request->except('image');
        $data['created_by'] = auth()->id();
        $name = $data['name'];
        $path= "uploads/image/category/main/";
        $thum_path = "uploads/image/category/thumbs/";
        if($request->has('image')){
            uploadImage($name,120,120,$thum_path,$request->image);
            $data['photo']  = uploadImage($name,300,300,$path,$request->image); 
        }
        Category::create($data);
        return response()->json(['msg'=> 'Category Added Successfully','cls'=>'success'],200);
    }

    public function delete($id){
       $category = Category::find($id);
       if($category->photo){
            deletePhoto(asset('/public/uploads/image/category/thumbs/'.$category->photo));
            deletePhoto(asset('/public/uploads/image/category/main/'.$category->photo));
        }
        $category->delete();
        return response()->json(['msg'=> 'Category Deleted Successfully','cls'=>'success'],200);
    }
}
