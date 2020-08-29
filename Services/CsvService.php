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
    public function upload($filename, $content)
    {
        $path = storage_path('csv/' . $filename);
        return file_put_contents($path, $content);
    }

    public function destroy($filename)
    {
        $file = storage_path('csv') . "/$filename";
        return File::delete($file);
    }

    public function files()
    {
        $path = storage_path('csv');
        $filesCollection = File::allFiles($path);
        $files = [];
        foreach ($filesCollection as $file) {
            $files[] = $file->getFilename();
        }
        return $files;
    }

    /**
     * Load CSV as an array of arrays
     * @param $csvFilename
     * @return array
     */
    public function loadCSV($csvFilename)
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
    }

    /**
     * Take a csv array of arrays + a mapped columns array and generate a remapped array of array plus unmapped array.
     *
     * Unmapped {columnNumber => newColumnNumber}
     * @param $csvRows
     * @param $mappedColumns
     */
    public function remapCSV($csvRows, $mappedColumns): array
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
    }

    public function processCSV($mappedRows, $unmappedRows)
    {
    }

    public function saveCSV($mappedRows, $unmappedRows)
    {
        $mappedCount = 0;
        $unmappedCount = 0;

        foreach ($mappedRows as $row) {
            print_r($row);
            $result = Contact::create($row);
            if($result->id>0)
            $mappedCount ++;
        }
        foreach ($unmappedRows as $row) {
            $result = CustomAttributes::create($row);
            if($result->id>0)
                $unmappedCount ++;
        }

        //

        return [$mappedCount, $unmappedCount];
    }

}
