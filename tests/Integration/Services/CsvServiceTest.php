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
     * Tests the csv/save API's main service call.
     * @test
     */
    public function save()
    {
        $contacts = [
            ['team_id' => 99999, 'name' => "John C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "john@smithSAVE.com", 'sticky_phone_number_id' => "12345",
                'created_at' => "2000-01-01", 'updated_at' => "2000-01-02"],
            ['team_id' => 99999, 'name' => "Jane C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "jane@smithSAVE.com", 'sticky_phone_number_id' => "12346",
                'created_at' => "2000-01-02", 'updated_at' => "2010-03-04"]
        ];
        $customAttributes = [
            ['contact_id' => 0, 'key' => "blah1", 'value' => "foo1"],
            ['contact_id' => 0, 'key' => "blah2", 'value' => "foo2"]
        ];

        $response = $this->service->saveCSV($contacts, $customAttributes);

        self::assertNotNull($response);
        self::assertIsArray($response);
        self::assertCount(4, $response);
        [$contactInserts, $customAttributeInserts, $customAttributesData, $errors] = $response;
        self::assertIsNumeric($contactInserts);
        self::assertIsNumeric($customAttributeInserts);
        self::assertIsArray($customAttributesData);
        self::assertIsArray($errors);

        // get the last ones added to db and check contact_id matches up
        $contacts = Contact::orderBy('id', 'desc')->get()->take(2);
        $customAttributes = CustomAttributes::orderBy('id', 'desc')->get()->take(2);
        self::assertCount(2, $contacts);
        self::assertCount(2, $customAttributes);
        $customAttributesContactIds = array_column($customAttributes->toArray(), 'contact_id');
        self::assertContains($contacts[1]->id, $customAttributesContactIds);
    }
}
