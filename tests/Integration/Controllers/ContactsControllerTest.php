<?php
/*
./vendor/bin/phpunit tests/Integration/Controllers/ContactsControllerTest.php
*/

namespace Tests\Integration\Controllers;

use App\Contact;
use App\CustomAttributes;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CsvController;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

class ContactsControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var CsvController */
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();

        $this->controller = new ContactsController();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * test
     */
    public function index()
    {
        $response = $this->controller->index();

        self::assertNotNull($response);
        self::assertInstanceOf($response);
        self::assertArrayHasKey('contacts_inserts', $response);
        self::assertArrayHasKey('custom_attributes_inserts', $response);
        self::assertArrayHasKey('contacts', $response);
        self::assertArrayHasKey('custom_attributes', $response);

        $contacts = Contact::all();
        $customAttributes = CustomAttributes::all();
        print_r($contacts->toArray());
        print_r($customAttributes->toArray());
        self::assertCount(2, $contacts);
        self::assertCount(2, $customAttributes);
    }

    /**
     * @test
     */
    public function destroy()
    {
        $contact = Contact::create([
            'team_id' => 99999,
            'name' => 'James DESTROY',
            'phone' => '12345678',
            'email' => 'james@DESTROY.com',
            'sticky_phone_number_id' => 123,
            'created_at' => '2020-08-02',
            'updated_at' => '2020-08-03',
        ]);

        $count = Contact::where('id', $contact->id)->count();
        self::assertEquals(1, $count);

        $this->controller->destroy($contact->id);

        $count = Contact::where('id', $contact->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * We delete twice to see what happens.
     * @test
     */
    public function destroyDoesntExist()
    {
        $contact = Contact::create([
            'team_id' => 99999,
            'name' => 'James DESTROY',
            'phone' => '12345678',
            'email' => 'james@DESTROY.com',
            'sticky_phone_number_id' => 123,
            'created_at' => '2020-08-02',
            'updated_at' => '2020-08-03',
        ]);

        $count = Contact::where('id', $contact->id)->count();
        self::assertEquals(1, $count);

        $this->controller->destroy($contact->id);
        $this->controller->destroy($contact->id);

        $count = Contact::where('id', $contact->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * Delete null to see if it crashes.
     * @test
     */
    public function destroyNull()
    {
        $response = $this->controller->destroy(null);

        $data = json_decode($response->content(), true);
        self::assertEquals(false, $data['result']);
    }

    /**
     * @test
     */
    public function customAttributesDestroy()
    {
        $customAttribute = CustomAttributes::create([
            'contact_id' => 99999,
            'key' => 'foo',
            'value' => 'bar'
        ]);

        $count = CustomAttributes::where('id', $customAttribute->id)->count();
        self::assertEquals(1, $count);

        $this->controller->customAttributesDestroy($customAttribute->id);

        $count = CustomAttributes::where('id', $customAttribute->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * We delete twice to see what happens.
     * @test
     */
    public function customAttributesDestroyDoesntExist()
    {
        $customAttribute = CustomAttributes::create([
            'contact_id' => 99999,
            'key' => 'foo',
            'value' => 'bar'
        ]);

        $count = CustomAttributes::where('id', $customAttribute->id)->count();
        self::assertEquals(1, $count);

        $this->controller->customAttributesDestroy($customAttribute->id);
        $this->controller->customAttributesDestroy($customAttribute->id);

        $count = CustomAttributes::where('id', $customAttribute->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * Delete null to see if it crashes.
     * @test
     */
    public function customAttributesDestroyNull()
    {
        $response = $this->controller->customAttributesDestroy(null);

        $data = json_decode($response->content(), true);
        self::assertEquals(false, $data['result']);
    }

}
