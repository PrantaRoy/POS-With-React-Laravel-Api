<?php

namespace App\Http\Controllers\api;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierListResource;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Supplier::query();
        $query = $query->when($request->search != '', function($q) use($request){
            $q->where('name','like','%'.$request->search.'%');
        });
        // $query->when($request->order_by, function($q) use($request){
        //     $q->where('name','like','%'.$request->name.'%');
        // });
        // $query->when($request->sort_by, function($q) use($request){
        //     $q->where('name','like','%'.$request->name.'%');
        // });
        

        $suppliers =  $query->paginate($request->per_page ? $request->per_page : 10 );
        return SupplierListResource::collection($suppliers) ;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        $data = $request->all();
        Supplier::create($data);
        return response()->json(['msg'=> 'Supplier Added Successfully','cls'=>'success'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
    }
}