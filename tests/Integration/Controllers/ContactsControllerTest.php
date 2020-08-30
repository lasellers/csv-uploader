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
     * @test
     */
    public function index()
    {

        $response = $this->controller->index();

        self::assertNotNull($response);
        self::assertInstanceOf($response);
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

    /**
     * @test
     */
    public function destroy()
    {
        $mock = \Mockery::mock('overload:ContactsController');
        $mock->shouldReceive('destroy')->andReturn(self::MOCK_UNIT);
        $this->app->instance(ContactsController::class, $mock);

        $response = $this->withoutMiddleware()
            ->json('DELETE', '/api/contacts/1', [])
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(self::MOCK_STRUCTURE);
    }

    /**
     * @test
     */
    public function customAttributesDestroy()
    {
        $mock = \Mockery::mock('overload:ContactsController');
        $mock->shouldReceive('customAttributesDestroy')->andReturn(self::MOCK_UNIT);
        $this->app->instance(ContactsController::class, $mock);

        $response = $this->withoutMiddleware()
            ->json('DELETE', '/api/custom-attributes/1', [])
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(self::MOCK_STRUCTURE);
        ;
    }
}
