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
        Schema::create('calculation_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->bigInteger('minCost');
            $table->bigInteger('maxCost');
            $table->bigInteger('minSpecial');
            $table->bigInteger('maxSpecial');
            $table->bigInteger('minResidual');
            $table->bigInteger('maxResidual');
            $table->decimal('minInterest');
            $table->decimal('maxInterest');
            $table->integer('minDuration');
            $table->integer('maxDuration');
            $table->integer('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calculation_types');
    }
};
