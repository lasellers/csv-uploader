<?php

namespace App\Services;

use App\Contact;
use App\CustomAttribute;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\CustomAttributeRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

class CsvService
{
    /**
     * Actually saves contact and custom attributes data to DB.
     * Note special handing of contact_id field.
     * @param array $contacts
     * @param array $customAttributes
     * @return array
     */
    public function saveCSV(array $contacts, array $customAttributes)
    {
        $errors = [];
        $contactInserts = 0;
        $customAttributeInserts = 0;

        $newCustomAttributes = $customAttributes;

        foreach ($contacts as $contactsIndex => $contactData) {
            try {
                [$valid, $error] = $this->validateContactData($contactData);
                if (!$valid) {
                    $errors[] = $error;
                }
                if ($valid) {
                    $contact = Contact::firstOrCreate([
                        'team_id' => $contactData['team_id'],
                        'name' => $contactData['name'],
                        'phone' => $contactData['phone'],
                        'email' => $contactData['email'],
                        'sticky_phone_number_id' => $contactData['sticky_phone_number_id'],
                        'created_at' => $contactData['created_at'],
                        'updated_at' => $contactData['updated_at'],
                    ], $contactData);

                    if ($contact->wasRecentlyCreated) {
                        $contactInserts++;

                        //
                        foreach ($customAttributes as $customAttributesIndex => $customAttributeData) {
                            // The custom attributes (ie unmapped rows) we receive from the frontend have a contact id
                            // that maps to the row index of the mapped rows (ie contacts). Now that we've saved a
                            // contact and it's model id, we replace the temp contact id with the read DB ID before
                            // saving custom attributes.
                            if ($customAttributeData['contact_id'] === $contactsIndex) {
                                $customAttributeData['contact_id'] = $contact->id;

                                $newCustomAttributes[$customAttributesIndex] = $customAttributeData;

                                [$valid, $error] = $this->validateCustomAttributeData($customAttributeData);
                                if (!$valid) {
                                    $errors[] = $error;
                                }
                                if ($valid) {
                                    $customAttribute = CustomAttribute::firstOrCreate([
                                        'contact_id' => $customAttributeData['contact_id'],
                                        'key' => $customAttributeData['key'],
                                        'value' => $customAttributeData['value'],
                                    ], $customAttributeData);

                                    if ($customAttribute->wasRecentlyCreated) {
                                        $customAttributeInserts++;
                                    }
                                }
                            }
                        }
                        //
                    }
                }
                // Because some of the fields don't have defaults or require numerics, etc this is a last line of
                // defense against bad data -- which can happen when we input csv that doesn't have all of the required
                // fields.
            } catch (QueryException $e) {
                $errors[] = $e->getMessage();
                Log::error($e->getMessage());
            }
        }

        return [$contactInserts, $customAttributeInserts, $newCustomAttributes, $errors];
    }

    protected function validateContactData(array $contact)
    {
        $validator = Validator::make($contact, ContactRequest::rules());
        if ($validator->fails()) {
            Log::error('Validator:Contact');
            Log::error($contact);
            Log::error($validator->errors());
            return [false, $validator->errors()];
        }
        return [true, null];
    }

    protected function validateCustomAttributeData(array $customAttribute)
    {
        $validator = Validator::make($customAttribute, CustomAttributeRequest::rules());
        if ($validator->fails()) {
            Log::error('Validator:CustomAttribute');
            Log::error($customAttribute);
            Log::error($validator->errors());
            return [false, $validator->errors()];
        }
        return [true, null];
    }
}
