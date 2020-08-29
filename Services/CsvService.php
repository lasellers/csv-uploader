<?php

namespace App\Services;

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
        //Storage::delete("csv/$filename");
        $file = storage_path('csv') . "/$filename";
        return File::delete($file);
    }

    public function files()
    {
        //$filesCollection = Storage::allFiles('csv');
        $path = storage_path('csv');
        $filesCollection = File::allFiles($path);
        $files = [];
        foreach ($filesCollection as $file) {
            $files[] = $file->getFilename();
        }
//        $files2 = File::allFiles($path);
        //       $files3 = File::glob("$path/*.csv");

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
        echo "remapCSV\n";
        print_r($csvRows);
        print_r($mappedColumns);
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
            print_r($mapped);
            print_r($unmapped);

            $mappedRows[] = $mapped;
            $unmappedRows[] = $unmapped;
        }

        return [$mappedRows, $unmappedRows];
    }

    public function processCSV($mappedRows, $unmappedRows)
    {
        echo "processCSV\n";
        $mappedCount = 0;
        $unmappedCount = 0;
        foreach ($mappedRows as $row) {
            $mappedCount++;
            $unmappedCount++;
        }

        return [$mappedCount, $unmappedCount];

    }

}
