<?php

use App\Models\ZoneArea;
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
        Schema::create('zone_areas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('display_name');
            $table->boolean('active_status')->default(true);
            $table->integer('district_id')->nullable();
            $table->integer('division_id')->nullable();
            $table->timestamps();
        });

        $dhakaZones = ['Dhanmondi','Adabor','Demra','Paltan','Mirpur','Gulistan','Gulshan','Banana'];
        foreach($dhakaZones as $zone){
            $new = new ZoneArea();
            $new->name = $zone;
            $new->display_name = $zone;
            $new->division_id = 1;
            $new->district_id = 1;
            $new->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zone_areas');
    }
};
