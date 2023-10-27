<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrganizationType;

class OrganizationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizationTypes = [
            [
                'name' => 'Einzelunternehmen (Nichtkaufleute/Kleingewerbetreibende)',
                'capital' => 'kein festes Kapital',
                'minimum_deposit' => 'keine Mindesteinzahlung vorgeschrieben',
                'founder_count' => '1',
                'liability' => 'unbeschränkt mit Geschäfts- und Privatvermögen',
                'decision_making' => 'Alleinentscheidung des Inhabers',
                'formalities_costs' => 'Gewerbeanmeldung/gering',
                'registration_hr' => 'Nein',
                'contract_formalities' => '',
            ],
            [
                'name' => 'Einzelkaufleute (Kaufmann)',
                'capital' => 'kein festes Kapital',
                'minimum_deposit' => 'keine Mindesteinzahlung vorgeschrieben',
                'founder_count' => '1',
                'liability' => 'unbeschränkt mit Geschäfts- und Privatvermögen',
                'decision_making' => 'Alleinentscheidung des Inhabers, Bestellung von Prokuristen möglich',
                'formalities_costs' => 'Gewerbeanmeldung und Anmeldung zur Eintragung in das Handelsregister/relativ gering',
                'registration_hr' => 'Ja',
                'contract_formalities' => '',
            ],
            [
                'name' => 'GbR Gesellschaft Bürgerlichen Rechts (Nichtkaufleute/Kleingewerbetreibende)',
                'capital' => 'kein festes Kapital',
                'minimum_deposit' => 'keine Mindesteinzahlung vorgeschrieben',
                'founder_count' => 'mindestens 2 Gesellschaft und Gesellschafter (auch mit Privatvermögen) für Gesellschaftsschulden, gesamtschuldnerische Haftung',
                'liability' => 'Gemeinsame Geschäftsführung und Vertretung durch alle Gesellschafter, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'decision_making' => 'Alle Gesellschafter haben gleichberechtigte Entscheidungsbefugnis, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'formalities_costs' => 'schriftlicher Gesellschaftsvertrag nicht zwingend erforderlich, aber zu empfehlen',
                'registration_hr' => 'Nein',
                'contract_formalities' => '',
            ],
            [
                'name' => 'OHG Offene Handelsgesellschaft (Kaufmann)',
                'capital' => 'kein festes Kapital',
                'minimum_deposit' => 'keine Mindesteinzahlung vorgeschrieben',
                'founder_count' => 'mindestens 2 Gesellschaft und Gesellschafter (auch mit Privatvermögen) für Gesellschaftsschulden, gesamtschuldnerische Haftung',
                'liability' => 'Einzelgeschäftsführung und Einzelvertretungsmacht jedes Gesellschafter, sofern im Gesellschaftsvertrag nichts anderes geregelt ist, Bestellung von Prokuristen möglich',
                'decision_making' => 'Alle Gesellschafter haben gleichberechtigte Entscheidungsbefugnis, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'formalities_costs' => 'Ja, schriftlicher Gesellschaftsvertrag nicht zwingend erforderlich, aber zu empfehlen',
                'registration_hr' => '',
                'contract_formalities' => '',
            ],
            [
                'name' => 'KG Kommanditgesellschaft (Kaufmann)',
                'capital' => 'kein festes Kapital, jedoch Kommanditeinlagen für Kommanditisten (Höhe beliebig)',
                'minimum_deposit' => '',
                'founder_count' => 'mindestens 2 Gesellschaft und Gesellschafter (Komplementäre) unbeschränkt, Kommanditisten in Höhe der Einlage (Haftungsbeschränkung tritt in der Regel erst nach Eintragung im Handelsregister ein)',
                'liability' => 'Komplementäre haften unbeschränkt, Kommanditisten haften nur in Höhe ihrer Einlage',
                'decision_making' => 'Komplementäre haben Einzelgeschäftsführung und Einzelvertretungsmacht, sofern im Gesellschaftsvertrag nichts anderes geregelt ist, Bestellung von Prokuristen möglich',
                'formalities_costs' => 'schriftlicher Gesellschaftsvertrag nicht zwingend erforderlich, aber zu empfehlen',
                'registration_hr' => 'Ja',
                'contract_formalities' => '',
            ],
            [
                'name' => 'GmbH Gesellschaft mit beschränkter Haftung',
                'capital' => 'Mindeststammkapital: 25.000 Euro, Mindesteinzahlung bei Gründung: 12.500 Euro',
                'minimum_deposit' => '',
                'founder_count' => 'mindestens 1, nur mit Gesellschaftsvermögen (Haftungsbeschränkung tritt erst nach Eintragung in das Handelsregister ein), ggf. persönliche Haftung des Geschäftsführers',
                'liability' => 'Geschäftsführer, Geschäftspolitik: Gesellschafterversammlung, sofern vorhanden Aufsichtsrat, Bestellung von Prokuristen möglich',
                'decision_making' => 'Geschäftsführer haben Einzelgeschäftsführung und Einzelvertretungsmacht, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'formalities_costs' => 'schriftlicher Gesellschaftsvertrag zwingend erforderlich, Mindestinhalt gesetzlich geregelt, notarielle Beurkundung erforderlich, notarielles Musterprotokoll kann in einfachen Fällen genutzt werden',
                'registration_hr' => 'Ja',
                'contract_formalities' => '',
            ],
            [
                'name' => 'UG (haftungsbeschränkt) Unternehmergesellschaft',
                'capital' => 'Mindeststammkapital: 1 Euro, vollständige Einzahlung bei Gründung erforderlich, nur Bargründung möglich',
                'minimum_deposit' => '',
                'founder_count' => 'mindestens 1, nur mit Gesellschaftsvermögen (Haftungsbeschränkung tritt erst nach Eintragung in das Handelsregister ein), ggf. persönliche Haftung des Geschäftsführers',
                'liability' => 'Geschäftsführer, Geschäftspolitik: Gesellschafterversammlung, sofern vorhanden Aufsichtsrat, Bestellung von Prokuristen möglich',
                'decision_making' => 'Geschäftsführer haben Einzelgeschäftsführung und Einzelvertretungsmacht, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'formalities_costs' => 'schriftlicher Gesellschaftsvertrag zwingend erforderlich, Mindestinhalt gesetzlich geregelt, notarielle Beurkundung erforderlich, notarielles Musterprotokoll kann in einfachen Fällen genutzt werden',
                'registration_hr' => 'Ja',
                'contract_formalities' => '',
            ],
            [
                'name' => 'AG Aktiengesellschaft',
                'capital' => 'Mindestgrundkapital: 50.000 Euro',
                'minimum_deposit' => '',
                'founder_count' => 'mindestens 1, nur mit Gesellschaftsvermögen (Haftungsbeschränkung tritt erst nach Eintragung in das Handelsregister ein), ggf. persönliche Haftung des Vorstandes',
                'liability' => 'Vorstand, Geschäftspolitik: Aufsichtsrat, Hauptversammlung, Bestellung von Prokuristen möglich',
                'decision_making' => 'Vorstand hat Einzelgeschäftsführung und Einzelvertretungsmacht, sofern im Gesellschaftsvertrag nichts anderes geregelt ist',
                'formalities_costs' => 'schriftlicher Gesellschaftsvertrag zwingend erforderlich, Mindestinhalt gesetzlich geregelt, notarielle Beurkundung erforderlich',
                'registration_hr' => 'Ja',
                'contract_formalities' => '',
            ],
        ];

        foreach ($organizationTypes as $type) {
            OrganizationType::firstOrCreate($type);
        }
    }
}
