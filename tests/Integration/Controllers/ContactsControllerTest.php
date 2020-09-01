<?php
/*
./vendor/bin/phpunit tests/Integration/Controllers/ContactsControllerTest.php
*/

namespace Tests\Integration\Controllers;

use App\Contact;
use App\CustomAttribute;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CsvController;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\JsonResponse;
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
     * @test
     */
    public function index()
    {
        $contact = Contact::create([
            'team_id' => 99999,
            'name' => 'James INDEX',
            'phone' => '12345678',
            'email' => 'james@INDEX.com',
            'sticky_phone_number_id' => 123,
            'created_at' => '2020-08-02',
            'updated_at' => '2020-08-03',
        ]);

        //
        $response = $this->controller->index();

        //
        self::assertNotNull($response);
        self::assertInstanceOf(JsonResponse::class, $response);

        $items = json_decode($response->content(), true);
        self::assertIsArray($items);

        //
        foreach ($items as $item) {
            self::assertArrayHasKey('custom_attributes', $item);
        }

        //
        $contactData = $contact->toArray();
        $count = 0;
        foreach ($items as $item) {
            unset($item['custom_attributes']);
            if ($contactData['id'] === $item['id']) {
                self::assertEquals($contactData, $item);
                $count++;
            }
        }
        self::assertEquals(1, $count);
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
        $this->expectException(\TypeError::class);

        $response = $this->controller->destroy(null);

        $data = json_decode($response->content(), true);
        self::assertEquals(false, $data['result']);
    }

    /**
     * @test
     */
    public function customAttributeDestroy()
    {
        $customAttribute = CustomAttribute::create([
            'contact_id' => 99999,
            'key' => 'foo',
            'value' => 'bar'
        ]);

        $count = CustomAttribute::where('id', $customAttribute->id)->count();
        self::assertEquals(1, $count);

        $this->controller->customAttributeDestroy($customAttribute->id);

        $count = CustomAttribute::where('id', $customAttribute->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * We delete twice to see what happens.
     * @test
     */
    public function customAttributeDestroyDoesntExist()
    {
        $customAttribute = CustomAttribute::create([
            'contact_id' => 99999,
            'key' => 'foo',
            'value' => 'bar'
        ]);

        $count = CustomAttribute::where('id', $customAttribute->id)->count();
        self::assertEquals(1, $count);

        $this->controller->customAttributeDestroy($customAttribute->id);
        $this->controller->customAttributeDestroy($customAttribute->id);

        $count = CustomAttribute::where('id', $customAttribute->id)->count();
        self::assertEquals(0, $count);
    }

    /**
     * Delete null to see if it crashes.
     * @test
     */
    public function customAttributeDestroyNull()
    {
        $this->expectException(\TypeError::class);

        $response = $this->controller->customAttributeDestroy(null);

        $data = json_decode($response->content(), true);
        self::assertEquals(false, $data['result']);
    }
}
