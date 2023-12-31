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
        Schema::create('calculations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('cost');
            $table->bigInteger('special');
            $table->bigInteger('residual');
            $table->decimal('interest');
            $table->integer('duration');
            $table->bigInteger('rate');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('organization_id')->constrained();
            $table->foreignId('customer_id')->constrained();
            $table->foreignId('calculation_type_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calculations');
    }
};
