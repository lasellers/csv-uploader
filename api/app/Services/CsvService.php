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
     * @param $contacts
     * @param $customAttributes
     * @return array
     */
    public function saveCSV($contacts, $customAttributes)
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
                            // The custom attributes (ie unmapped rows) we receive from the frontend have a contact id that
                            // maps to the row index of the mapped rows (ie contacts). Now that we've saved a contact and
                            // it's model id, we replace the temp contact id with the read DB ID before saving custom attributes.
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

    protected function validateContactData($contact)
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

    protected function validateCustomAttributeData($customAttribute)
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

    /*public function upload($filename, $content)
    {
        $path = storage_path('csv/' . $filename);
        return file_put_contents($path, $content);
    }*/

    /*public function destroy($filename)
    {
        $file = storage_path('csv') . "/$filename";
        return File::delete($file);
    }*/

    /*public function files()
    {
        $path = storage_path('csv');
        $filesCollection = File::allFiles($path);
        $files = [];
        foreach ($filesCollection as $file) {
            $files[] = $file->getFilename();
        }
        return $files;
    }*/

    /**
     * Load CSV as an array of arrays
     * @param $csvFilename
     * @return array
     */
    /*public function loadCSV($csvFilename)
    {
        $path = storage_path('csv/' . $csvFilename);

        $contents = trim(file_get_contents($path));
        $lines = explode("\n", $contents);

        $rows = [];
        $headers = [];

        foreach ($lines as $index => $line) {
            if ($index === 0) {
                $headers[] = explode(",", $line);
            } else {
                $rows[] = explode(",", $line);
            }
        }

        return [$headers, $rows];
    }*/

    /**
     * Take a csv array of arrays + a mapped columns array and generate a remapped array of array plus unmapped array.
     *
     * Unmapped {columnNumber => newColumnNumber}
     * @param $csvRows
     * @param $mappedColumns
     */
    /*public function remapCSV($csvRows, $mappedColumns): array
    {
        $mappedRows = [];
        $unmappedRows = [];

        foreach ($csvRows as $row) {
            $mapped = [];
            $unmapped = [];
            foreach ($row as $key => $value) {
                if ($mappedColumns[$key]) {
                    $mapped[$mappedColumns[$key]] = $value;
                } else {
                    $unmapped[] = $value;
                }
            };

            $mappedRows[] = $mapped;
            $unmappedRows[] = $unmapped;
        }

        return [$mappedRows, $unmappedRows];
    }*/

    /*public function processCSV($mappedRows, $unmappedRows)
    {
    }*/
}
