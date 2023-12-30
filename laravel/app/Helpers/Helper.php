<?php

use Intervention\Image\Facades\Image;


function uploadImage($name, $height,$width, $path ,$req_file){
     $file_name =$name.'.webp';
     Image::make($req_file)->fit($height,$width)->save(public_path($path).$file_name,50,'webp');
     return $file_name;
}

function deletePhoto($image_path){
     if(file_exists($image_path) ){
          unlink($image_path);
     }
}