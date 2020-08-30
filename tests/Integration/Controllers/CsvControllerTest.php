<?php
/*
./vendor/bin/phpunit tests/Integration/Controllers/CsvControllerTest.php
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

class CsvControllerTest extends TestCase
{
    use DatabaseTransactions;

    //const MOCK_UNIT = ["MOCK" => true];
    //const MOCK_STRUCTURE = ["MOCK"];

    /** @var CsvController */
    protected $controller;
    /** @var CsvService */
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();

        // For the controller we're not actually interested in the main service function as we test that
        // in the services tests, so this test is a pseudo unit test
        /*$mock = \Mockery::mock('overload:' . CsvController::class);
        $mock->shouldReceive('save')
            ->andReturn(self::MOCK_UNIT);
        $this->app->instance(CsvController::class, $mock);*/

        $this->service = new CsvService();
        $this->controller = new CsvController($this->service);
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
        $request = new SaveCSVRequest(
            [
                'data' => [
                    [1, "John C. Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"],
                    [1, "Jane C. Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"]
                ],
                'umapped_data' => [
                    [0, "blah", "foo"],
                    [0, "blah2", "foo2"]
                ]
            ]
        );
        $response = $this->controller->save($request);
        self::assertNotNull($response);
        self::assertIsObject($response);
        self::assertArrayHasKey('data_inserts', $response);
        self::assertArrayHasKey('unmapped_data_inserts', $response);
        self::assertArrayHasKey('data', $response);
        self::assertArrayHasKey('unmapped_data', $response);

        $contacts = Contact::all();
        $customAttributes = CustomAttributes::all();
        print_r($contacts->toArray());
        print_r($customAttributes->toArray());
        self::assertCount(2, $contacts);
        self::assertCount(2, $customAttributes);
    }

}
