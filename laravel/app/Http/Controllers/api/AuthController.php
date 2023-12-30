<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(AuthRequest $request){
       $user = User::where('email',$request->email)->orWhere('mobile',$request->email)->first();
       if($user && (Hash::check($request->password, $user->password))){
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['email'] = $user->email;
            $user_data['role_id'] = $user->role_id; 
            $user_data['photo'] = $user->photo; 
            return response()->json($user_data);
       }
       elseif($user){
            throw ValidationException::withMessages([
                'password' => ['Password did not match our record']
            ]);
       }else{
            throw ValidationException::withMessages([
                'email' => ['Email did not match our record']
            ]);
       }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(['msg' => 'You Have Successfully Logout']);
    }
}
