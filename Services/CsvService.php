<?php

namespace App\Services;

use App\Contact;
use App\CustomAttributes;
use App\Http\Requests\UploadCSVRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

class CsvService
{
    /**
     * Actually saves contact and custom attributes data to DB.
     * Note special handing of contact_id field.
     * @param $mappedRows
     * @param $unmappedRows
     * @return array
     */
    public function saveCSV($mappedRows, $unmappedRows)
    {
        $mappedCount = 0;
        $unmappedCount = 0;

        $newUnmappedRows = $unmappedRows;

        foreach ($mappedRows as $index => $contactData) {
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
                $mappedCount++;

                //
                foreach ($unmappedRows as $index2 => $customAttributeData) {
                    // The custom attributes (ie unmapped rows) we receive from the frontend have a contact id that
                    // maps to the row index of the mapped rows (ie contacts). Now that we've saved a contact and
                    // it's model id, we replace the temp contact id with the read DB ID before saving custom attributes.
                    if ($customAttributeData['contact_id'] === $index) {
                        $customAttributeData['contact_id'] = $contact->id;

                        $newUnmappedRows[$index2] = $customAttributeData;

                        $customAttribute = CustomAttributes::firstOrCreate([
                            'contact_id' => $customAttributeData['contact_id'],
                            'key' => $customAttributeData['key'],
                            'value' => $customAttributeData['value'],
                        ], $customAttributeData);

                        if ($customAttribute->wasRecentlyCreated) {
                            $unmappedCount++;
                        }
                    }
                }
                //

            }
        }

        return [$mappedCount, $unmappedCount, $newUnmappedRows];
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
