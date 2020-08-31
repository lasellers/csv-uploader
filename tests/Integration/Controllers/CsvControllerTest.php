<?php
/*
./vendor/bin/phpunit tests/Integration/Controllers/CsvControllerTest.php
*/

namespace Tests\Integration\Controllers;

use App\Contact;
use App\CustomAttribute;
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
                    [1, "John C. Smith TEST", "555-555-5555", "john@smithTEST.com", "12345", "2000-01-01", "2000-01-02"],
                    [1, "Jane C. Smith TEST", "555-555-5555", "jane@smithTEST.com", "12346", "2000-01-01", "2010-03-04"]
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
        $customAttributes = CustomAttribute::orderBy('id', 'desc')->get()->take(2);
        self::assertCount(2, $contacts);
        self::assertCount(2, $customAttributes);
        $customAttributesContactIds = array_column($customAttributes->toArray(), 'contact_id');
        self::assertContains($contacts[1]->id, $customAttributesContactIds);

        self::assertEquals(2, $data['contact_inserts']);
        self::assertEquals(2, $data['custom_attribute_inserts']);
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

        self::assertEquals(0, $data['contact_inserts']);
        self::assertEquals(0, $data['custom_attribute_inserts']);
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

        self::assertEquals(0, $data['contact_inserts']);
        self::assertEquals(0, $data['custom_attribute_inserts']);
    }

    /**
     * The data we get from the frontend lacks associate field names, so we run it through a function to add them.
     * This checks that works with sample data from Postman.
     * @test
     */
    public function convertSimpleArrayToAssociateArray()
    {
        $contactsData = [
            [99999, "John C. Smith TEST", "555-555-5555", "john@smithTEST.com", "12345", "2000-01-01", "2000-01-02"],
            [99999, "Jane C. Smith TEST", "555-555-5555", "jane@smithTEST.com", "12346", "2000-01-02", "2010-03-04"]
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
            ['team_id' => 99999, 'name' => "John C. Smith TEST", 'phone' => "555-555-5555",
                'email' => "john@smithTEST.com", 'sticky_phone_number_id' => "12345",
                'created_at' => "2000-01-01", 'updated_at' => "2000-01-02"],
            ['team_id' => 99999, 'name' => "Jane C. Smith TEST", 'phone' => "555-555-5555",
                'email' => "jane@smithTEST.com", 'sticky_phone_number_id' => "12346",
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
            [99999, "John C. Smith TEST", "555-555-5555", "john@smithTEST.com", "12345", "2000-01-01", "2000-01-02"],
            [99999, "Jane C. Smith TEST", "555-555-5555", "jane@smithTEST.com", "12346", "2000-01-02", "2010-03-04"]
        ];
        $customAttributesData = [
        ];

        [$contacts, $customAttributes] = $this->controller->convertSimpleArrayToAssociateArray(
            $contactsData,
            $customAttributesData
        );

        $contactsTest = [
            ['team_id' => 99999, 'name' => "John C. Smith TEST", 'phone' => "555-555-5555",
                'email' => "john@smithTEST.com", 'sticky_phone_number_id' => "12345",
                'created_at' => "2000-01-01", 'updated_at' => "2000-01-02"],
            ['team_id' => 99999, 'name' => "Jane C. Smith TEST", 'phone' => "555-555-5555",
                'email' => "jane@smithTEST.com", 'sticky_phone_number_id' => "12346",
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

    /**
     * Caught a bug. Turns out it was because the updated_at date for the first two was "2000-01".
     * We change it here so that one of them has a valid date but the other doesn't. So we would expect 1 to save and
     * 1 not to (i.e., one will be rejected).
     *
     * @test
     */
    public function saveDups()
    {
        $request = new SaveCSVRequest(
            [
                'contacts' => [
                    [1, "John Smith TEST A", "555-555-5555", "john@smith.com", "12345", "2000-01-01", "2000-01"],
                    [1, "Bob Smith TEST B", "555-555-5556", "bob@smith.com", "12346", "2000-01-01", "2000-01-01"],
                    [2, "Jane Cordova TEST C", "555-555-6000", "jane@smith.com", "12347", "2000-01-01", "2001-10-01"],
                    [3, "Jill Cordova TEST D", "555-555-6001", "jill@smith.com", "12348", "2000-01-01", "2001-10-01"]
                ],
                'custom_attributes' => [
                ]
            ]
        );

        // 1
        $response = $this->controller->save($request);

        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);
        $data = json_decode($response->content(), true);

        self::assertEquals(4, $data['contact_inserts']);
        self::assertEquals(0, $data['custom_attribute_inserts']);

        // 2
        $response = $this->controller->save($request);

        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);
        $data = json_decode($response->content(), true);

        self::assertEquals(0, $data['contact_inserts']);
        self::assertEquals(0, $data['custom_attribute_inserts']);

        // 3
        $response = $this->controller->save($request);

        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);
        $data = json_decode($response->content(), true);

        self::assertEquals(0, $data['contact_inserts']);
        self::assertEquals(0, $data['custom_attribute_inserts']);
    }
}
