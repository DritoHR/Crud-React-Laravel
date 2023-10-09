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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('customer_dni');
            $table->string('product');
            $table->string('subproduct');
            $table->string('maintenance')->nullable();
            $table->string('state');
            $table->string('subproduct_gas')->nullable();
            $table->string('maintenance_light')->nullable();
            $table->string('maintenance_gas')->nullable();
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
