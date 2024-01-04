<?php

use App\Models\District;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('display_name');
            $table->boolean('active_status')->default(true);
            $table->integer('division_id')->nullable();
            $table->timestamps();
        });

        $dhakaDisctricts = ['Dhaka','Gazipur','Manikganj','Faridpur'];
        foreach($dhakaDisctricts as $dis){
            $new = new District();
            $new->name = $dis;
            $new->display_name = $dis;
            $new->division_id = 1;
            $new->save();
        }

        $KhuDisctricts = ['Jessore','Khulna','Jhenaidah','Kushtia'];
        foreach($KhuDisctricts as $dis){
            $new = new District();
            $new->name = $dis;
            $new->display_name = $dis;
            $new->division_id = 3;
            $new->save();
        }
    }

    
    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
