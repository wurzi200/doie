<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('number');
            $table->unsignedBigInteger('organization_id')->nullable();
            $table->unsignedBigInteger('gender_id')->nullable();
            $table->timestamps();

            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('set null');
            $table->foreign('gender_id')->references('id')->on('genders')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
