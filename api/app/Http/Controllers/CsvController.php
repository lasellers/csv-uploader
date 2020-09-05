<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCSVRequest;
use Illuminate\Support\Facades\Schema;
use App\Services\CsvService;

class CsvController extends Controller
{
    /**
     * @var CsvService
     */
    protected CsvService $service;

    public function __construct(CsvService $service)
    {
        $this->service = $service;
    }

    /**
     * Takes the incoming contacts/customAttributes data which is stripped of key names (simple array)
     * and adds them (associative array).
     *
     * @param $contactsData
     * @param $customAttributesData
     * @return array
     */
    public function convertSimpleArrayToAssociateArray($contactsData, $customAttributesData)
    {
        // pull tables field names
        $contactColumns = Schema::getColumnListing('contacts');
        $customAttributeColumns = Schema::getColumnListing('custom_attributes');
        unset($contactColumns[0]); //remove id field
        unset($customAttributeColumns[0]); //remove id field
        $contactColumns = array_values($contactColumns);
        $customAttributeColumns = array_values($customAttributeColumns);

        //
        if (is_string($contactsData)) {
            $contactsData = json_decode(trim($contactsData));
        }
        if (!is_array($contactsData)) {
            $contactsData = [];
        }
        foreach ($contactsData as $index => $contact) {
            $newContact = [];
            foreach ($contact as $index2 => $value) {
                $newContact[$contactColumns[$index2]] = $value;
            }
            $contactsData[$index] = $newContact;
        }

        // 2
        if (is_string($customAttributesData)) {
            $customAttributesData = json_decode(trim($customAttributesData));
        }
        if (!is_array($customAttributesData)) {
            $customAttributesData = [];
        }
        foreach ($customAttributesData as $index => $contactAttribute) {
            $newContactAttribute = [];
            foreach ($contactAttribute as $index2 => $value) {
                $newContactAttribute[$customAttributeColumns[$index2]] = $value;
            }
            $customAttributesData[$index] = $newContactAttribute;
        }

        return [$contactsData, $customAttributesData];
    }

    /**
     * Preps all in/out data and then calls service to save contacts and contact custom attributes.
     *
     * @param SaveCSVRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function save(SaveCSVRequest $request)
    {
        $contacts = $request->get('contacts');
        $customAttributes = $request->get('custom_attributes');

        [$contacts, $customAttributes] = $this->convertSimpleArrayToAssociateArray($contacts, $customAttributes);

        //
        [$contactInserts, $customAttributeInserts, $newCustomAttributes, $errors] = $this->service->saveCSV(
            $contacts,
            $customAttributes
        );

        return response()->json([
            'contact_inserts' => $contactInserts,
            'custom_attribute_inserts' => $customAttributeInserts,
            'contacts' => $contacts,
            'custom_attributes' => $newCustomAttributes,
            'errors' => $errors
        ]);
    }
}
