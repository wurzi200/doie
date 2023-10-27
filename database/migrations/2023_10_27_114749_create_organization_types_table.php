<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganizationTypesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organization_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name der Rechtsform
            $table->string('capital')->nullable(); // Kapital
            $table->string('minimum_deposit')->nullable(); // Mindesteinzahlung
            $table->string('founder_count')->nullable(); // Gründerzahl
            $table->string('liability')->nullable(); // Haftung
            $table->string('decision_making')->nullable(); // Entscheidungsbefugnis/Vertretung
            $table->string('formalities_costs')->nullable(); // Formalitäten/Kosten
            $table->string('registration_hr')->nullable(); // Eintragung in das HR
            $table->string('contract_formalities')->nullable(); // Vertrag/Formvorschriften
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_types');
    }
}
