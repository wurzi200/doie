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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name der Organisation
            $table->integer('type')->nullable();
            $table->string('logo')->nullable(); // Logo
            $table->string('website')->nullable(); // Webseite
            $table->string('email')->nullable(); // E-Mail
            $table->string('establishment_date')->nullable(); // Gründungsdatum
            $table->string('commercial_register_number')->nullable(); // Handelsregisternummer
            $table->string('tax_number')->nullable(); // Steuernummer
            $table->string('vat_id')->nullable(); // Umsatzsteuer-ID

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
