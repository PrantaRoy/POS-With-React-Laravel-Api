<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('mobile')->nullable();
            $table->string('owner_name');
            $table->string('owner_mobile');
            $table->string('address')->nullable();
            $table->foreignId('country_id')->nullable();
            $table->foreignId('division_id')->nullable();
            $table->foreignId('district_id')->nullable();
            $table->foreignId('zone_id')->nullable();
            $table->string('trade_license')->nullable();
            $table->string('business_type')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
