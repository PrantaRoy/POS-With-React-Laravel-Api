<?php

use App\Models\Division;
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
        Schema::create('divisions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('display_name');
            $table->boolean('active_status')->default(true);
            $table->integer('country_id')->nullable();
            $table->timestamps();
        });

        $lists = ['Dhaka','Chittagong','Khulna','Rajshahi','Barishal','Rangpur','Sylhet'];
        foreach($lists as $division){
            $new = new Division();
            $new->name = $division;
            $new->display_name = $division;
            $new->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divisions');
    }
};
