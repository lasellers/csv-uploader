<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCSVRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File; // Illuminate\Filesystem\Filesystem
use App\Contact;
use App\CustomAttributes;
use Illuminate\Support\Facades\Schema;
use App\Services\CsvService;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
     * Preps all in/out data and then calls service to save contacts and contact custom attributes
     *
     * @param SaveCSVRequest $request
     * @return array
     */
    public function save(SaveCSVRequest $request)
    {
        $contactColumns = Schema::getColumnListing('contacts');
        $customAttributeColumns = Schema::getColumnListing('custom_attributes');
        unset($contactColumns[0]); //remove id field
        unset($customAttributeColumns[0]); //remove id field
        $contactColumns = array_values($contactColumns);
        $customAttributeColumns = array_values($customAttributeColumns);

        //
        $mappedRows = $request->get('data');
        if (is_string($mappedRows)) {
            $mappedRows = json_decode(trim($mappedRows));
        }
        if (is_array($mappedRows)) {
            foreach ($mappedRows as $index => $contact) {
                $newContact = [];
                foreach ($contact as $index2 => $value) {
                    $newContact[$contactColumns[$index2]] = $value;
                }
                $mappedRows[$index] = $newContact;
            }
        }

        // 2
        $unmappedRows = $request->get('unmapped_data');
        if (is_string($unmappedRows)) {
            $unmappedRows = json_decode(trim($unmappedRows));
        }
        if (is_array($unmappedRows)) {
            foreach ($unmappedRows as $index => $contactAttribute) {
                $newContactAttribute = [];
                foreach ($contactAttribute as $index2 => $value) {
                    $newContactAttribute[$customAttributeColumns[$index2]] = $value;
                }
                $unmappedRows[$index] = $newContactAttribute;
            }
        }

        //
        [$dataInserts, $unmappedDataInserts, $newUnmappedData, $errors] = $this->service->saveCSV(
            $mappedRows,
            $unmappedRows
        );

        if (count($errors) > 0) {
            throw new HttpException(Response::HTTP_UNPROCESSABLE_ENTITY, 'CSV format error.');
        }

        return response()->json([
            'data_inserts' => $dataInserts,
            'unmapped_data_inserts' => $unmappedDataInserts,
            'data' => $mappedRows,
            'unmapped_data' => $newUnmappedData,
            'errors' => $errors
        ]);
    }

    /**
     * Gets list of csv files in storage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function index()
    {
        $files = $this->service->files();
        return response()->json($files);
    }*/

    /**
     * Deletes csv file in storage
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function destroy($filename)
    {
        $status = $this->service->destroy($filename);
        return response()->json(['delete' => $status]);
    }*/

    /**
     * Fetches csv file as array
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function file($filename)
    {
        $status = $this->service->file($filename);
        return response()->json(['file' => $status]);
    }*/

    /**
     * Uploads CSV file to storage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function upload(UploadCSVRequest $request)
    {
        $filename = $request->get('filename');
        $content = $request->get('content');

        $result = $this->service->upload($filename, $content);
        return response()->json(['length' => $result, 'filename' => $filename, 'content' => $content]);
    }*/

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
}
