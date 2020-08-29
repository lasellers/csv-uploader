<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File; // Illuminate\Filesystem\Filesystem
use App\Contact;
use App\CustomAttributes;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProcessCSVRequest;
use App\Http\Requests\UploadCSVRequest;
use App\Services\CsvService;

class CsvController extends Controller
{
    /**
     * @var CsvService
     */
    protected \App\Services\CsvService $service;

    public function __construct(CsvService $service)
    {
        $this->service = $service;
    }

    /**
     * Gets list of csv files in storage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $files = $this->service->files();
        return response()->json($files);
    }

    /**
     * Deletes csv file in storage
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($filename)
    {
        $status = $this->service->destroy($filename);
        return response()->json(['delete' => $status]);
    }

    /**
     * Fetches csv file as array
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function file($filename)
    {
        $status = $this->service->file($filename);
        return response()->json(['file' => $status]);
    }

    /**
     * Uploads CSV file to storage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(UploadCSVRequest $request)
    {
        $filename = $request->get('filename');
        $content = $request->get('content');

        $result = $this->service->upload($filename, $content);
        return response()->json(['length' => $result, 'filename' => $filename, 'content' => $content]);
    }

    /**
     * @param $filename
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function getFile($filename)
    {
        [$headers, $rows] = $this->service->loadCSV($filename);
        return response()->json(['count' => count($rows), 'headers' => $headers, 'data' => $rows]);
    }*/

    /**
     * @param $filename
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function remapFile(ProcessCSVRequest $request)
    {
        $filename = $request->get('filename');
        $mapped_columns = $request->get('mapped_columns');

        [$headers, $rows] = $this->service->loadCSV($filename);
        [$mappedRows, $unmappedRows] = $this->service->remapCSV($rows, $mapped_columns);
        return response()->json(['data' => ['mapped' => $mappedRows, 'unmapped' => $unmappedRows]]);
    }*/
    /**
     * The heart of things -- takes a list of columns to map to the csv data as input,
     * a string to the csv in storage that is in question then call the service to merge the data in.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function process(ProcessCSVRequest $request)
    {
    }*/


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function save(ProcessCSVRequest $request)
    {
        $columns = ['team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'];


        $headers = ($request->get('headers'));
        $mapped_columns = ($request->get('mapped_columns'));

        print_r($request->all());
        $mappedRows = ($request->get('data'));

        // key=>value
        echo "\n mapped=";
        print_r($mappedRows);

        //$mappedRows = json_decode($mappedRows);

        $mappedRows = [
            [1, "John Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"]
        ];
        echo "\n 2 mapped=";
        print_r($mappedRows);

        foreach ($mappedRows as $index => $row) {
            $newRow = [];
            foreach ($row as $index2 => $value) {
                $newRow[$columns[$index2]] = $value;
            }
            $mappedRows[$index] = $newRow;
        }

        echo "mapped=";
        print_r($mappedRows);

        // 2
        //$unmappedRows = ($request->get('unmapped_data'));
//               $unmappedRows = json_decode($unmappedRows);
        $unmappedRows = [
            [0, "blah", "foo"]
        ];

        foreach ($unmappedRows as $index => $row) {
            $newRow = [];
            foreach ($row as $index2 => $value) {
                $newRow[$columns[$index2]] = $value;
            }
            $unmappedRows[$index] = $newRow;
        }

        echo "unmapped=";
        print_r($unmappedRows);

        $result = $this->service->saveCSV($mappedRows, $unmappedRows);

        return response()->json(['result' => $result, 'mappedRows' => $mappedRows, 'unmappedRows' => $unmappedRows]);
    }
}
