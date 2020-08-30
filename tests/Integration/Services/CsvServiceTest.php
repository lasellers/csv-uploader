<?php
/*
./vendor/bin/phpunit tests/Integration/Services/CsvServiceTest.php
*/

namespace Tests\Integration\Controllers;

use App\Contact;
use App\CustomAttributes;
use App\Http\Controllers\CsvController;
use App\Http\Requests\SaveCSVRequest;
use App\Services\CsvService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

class CsvServiceTest extends TestCase
{
    use DatabaseTransactions;

    /** @var CsvService */
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = new CsvService();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function save()
    {
        $data = [
            [1, "John C. Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"],
            [1, "Jane C. Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"]
        ];
        $unmapped_data = [
            [0, "blah", "foo"],
            [0, "blah2", "foo2"]
        ];

        $response = $this->service->saveCSV($data, $unmapped_data);

        self::assertNotNull($response);
        self::assertIsObject($response);
        self::assertArrayHasKey('data_inserts', $response);
        self::assertArrayHasKey('unmapped_data_inserts', $response);
        self::assertArrayHasKey('data', $response);
        self::assertArrayHasKey('unmapped_data', $response);
        /*
                $contacts = Contact::all();
                $customAttributes = CustomAttributes::all();
                print_r($contacts->toArray());
                print_r($customAttributes->toArray());*/
    }
}
