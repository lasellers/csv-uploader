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
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Tests\TestCase;

class CsvControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var CsvController */
    protected $controller;
    /** @var CsvService */
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();

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
                'contacts' => [
                    [1, "John C. Smith", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01-02"],
                    [1, "Jane C. Smith", "555-555-5555", "jane@smith.com", "12346", "2000-01-01", "2010-03-04"]
                ],
                'custom_attributes' => [
                    [0, "blah", "foo"],
                    [0, "blah2", "foo2"]
                ]
            ]
        );
        $response = $this->controller->save($request);
        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);

        // convert json to array
        $data = json_decode($response->content(), true);

        self::assertArrayHasKey('contact_inserts', $data);
        self::assertArrayHasKey('custom_attribute_inserts', $data);
        self::assertArrayHasKey('contacts', $data);
        self::assertArrayHasKey('custom_attributes', $data);

        // get the last ones added to db and check contact_id matches up
        $contacts = Contact::orderBy('id', 'desc')->get()->take(2);
        $customAttributes = CustomAttributes::orderBy('id', 'desc')->get()->take(2);
        self::assertCount(2, $contacts);
        self::assertCount(2, $customAttributes);
        $customAttributesContactIds = array_column($customAttributes->toArray(), 'contact_id');
        self::assertContains($contacts[1]->id, $customAttributesContactIds);
    }

    /**
     * @test
     */
    public function saveNoData()
    {
        $request = new SaveCSVRequest(
            [
                'contacts' => [
                ],
                'custom_attributes' => [
                ]
            ]
        );
        $response = $this->controller->save($request);
        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);

        // convert json to array
        $data = json_decode($response->content(), true);

        self::assertArrayHasKey('contact_inserts', $data);
        self::assertArrayHasKey('custom_attribute_inserts', $data);
        self::assertArrayHasKey('contacts', $data);
        self::assertArrayHasKey('custom_attributes', $data);
    }

    /**
     * @test
     */
    public function saveNoDataFields()
    {
        $request = new SaveCSVRequest(
            [
            ]
        );

        $response = $this->controller->save($request);

        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);

        // convert json to array
        $data = json_decode($response->content(), true);

        self::assertArrayHasKey('contact_inserts', $data);
        self::assertArrayHasKey('custom_attribute_inserts', $data);
        self::assertArrayHasKey('contacts', $data);
        self::assertArrayHasKey('custom_attributes', $data);
    }

    /**
     * The data we get from the frontend lacks associate field names, so we run it through a function to add them.
     * This checks that works with sample data from Postman.
     * @test
     */
    public function convertSimpleArrayToAssociateArray()
    {
        $contactsData = [
            [99999, "John C. Smith SAVE", "555-555-5555", "john@smithSAVE.com", "12345", "2000-01-01", "2000-01-02"],
            [99999, "Jane C. Smith SAVE", "555-555-5555", "jane@smithSAVE.com", "12346", "2000-01-02", "2010-03-04"]
        ];
        $customAttributesData = [
            [0, "blah1", "foo1"],
            [0, "blah2", "foo2"]
        ];

        [$contacts, $customAttributes] = $this->controller->convertSimpleArrayToAssociateArray(
            $contactsData,
            $customAttributesData
        );

        $contactsTest = [
            ['team_id' => 99999, 'name' => "John C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "john@smithSAVE.com", 'sticky_phone_number_id' => "12345",
                'created_at' => "2000-01-01", 'updated_at' => "2000-01-02"],
            ['team_id' => 99999, 'name' => "Jane C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "jane@smithSAVE.com", 'sticky_phone_number_id' => "12346",
                'created_at' => "2000-01-02", 'updated_at' => "2010-03-04"]
        ];
        $customAttributesTest = [
            ['contact_id' => 0, 'key' => "blah1", 'value' => "foo1"],
            ['contact_id' => 0, 'key' => "blah2", 'value' => "foo2"]
        ];

        self::assertEquals($contacts, $contactsTest);
        self::assertEquals($customAttributes, $customAttributesTest);
    }

    /**
     * @test
     */
    public function convertSimpleArrayToAssociateArrayNoData()
    {
        $contactsData = [
        ];
        $customAttributesData = [
        ];

        [$contacts, $customAttributes] = $this->controller->convertSimpleArrayToAssociateArray(
            $contactsData,
            $customAttributesData
        );

        $contactsTest = [
        ];
        $customAttributesTest = [
        ];

        self::assertEquals($contacts, $contactsTest);
        self::assertEquals($customAttributes, $customAttributesTest);
    }

    /**
     * The data we get from the frontend lacks associate field names, so we run it through a function to add them.
     * This checks that works with sample data from Postman.
     * @test
     */
    public function convertSimpleArrayToAssociateArrayNoCustomAttributes()
    {
        $contactsData = [
            [99999, "John C. Smith SAVE", "555-555-5555", "john@smithSAVE.com", "12345", "2000-01-01", "2000-01-02"],
            [99999, "Jane C. Smith SAVE", "555-555-5555", "jane@smithSAVE.com", "12346", "2000-01-02", "2010-03-04"]
        ];
        $customAttributesData = [
        ];

        [$contacts, $customAttributes] = $this->controller->convertSimpleArrayToAssociateArray(
            $contactsData,
            $customAttributesData
        );

        $contactsTest = [
            ['team_id' => 99999, 'name' => "John C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "john@smithSAVE.com", 'sticky_phone_number_id' => "12345",
                'created_at' => "2000-01-01", 'updated_at' => "2000-01-02"],
            ['team_id' => 99999, 'name' => "Jane C. Smith SAVE", 'phone' => "555-555-5555",
                'email' => "jane@smithSAVE.com", 'sticky_phone_number_id' => "12346",
                'created_at' => "2000-01-02", 'updated_at' => "2010-03-04"]
        ];
        $customAttributesTest = [
        ];

        self::assertEquals($contacts, $contactsTest);
        self::assertEquals($customAttributes, $customAttributesTest);
    }

    /**
     * The data we get from the frontend lacks associate field names, so we run it through a function to add them.
     * This checks that works with sample data from Postman.
     * @test
     */
    public function convertSimpleArrayToAssociateArrayNoContacts()
    {
        $contactsData = [
        ];
        $customAttributesData = [
            [0, "blah1", "foo1"],
            [0, "blah2", "foo2"]
        ];

        [$contacts, $customAttributes] = $this->controller->convertSimpleArrayToAssociateArray(
            $contactsData,
            $customAttributesData
        );

        $contactsTest = [
        ];
        $customAttributesTest = [
            ['contact_id' => 0, 'key' => "blah1", 'value' => "foo1"],
            ['contact_id' => 0, 'key' => "blah2", 'value' => "foo2"]
        ];

        self::assertEquals($contacts, $contactsTest);
        self::assertEquals($customAttributes, $customAttributesTest);
    }
}
