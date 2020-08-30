<?php
/*
./vendor/bin/phpunit tests/Unit/Routes/ContactsControllerTest.php
*/

namespace Tests\Unit\Routes;

use App\Http\Controllers\ContactsController;
use Illuminate\Http\Response;
use Tests\TestCase;

class ContactsControllerTest extends TestCase
{
    const MOCK_UNIT = ["MOCK"=>true];
    const MOCK_STRUCTURE = ["MOCK"];

    /**
     * @test
     */
    public function index()
    {
        $mock = \Mockery::mock('overload:ContactsController');
        $mock->shouldReceive('index')->andReturn(self::MOCK_UNIT);
        $this->app->instance(ContactsController::class, $mock);

        $response = $this->withoutMiddleware()
            ->json('GET', '/api/contacts', [])
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(self::MOCK_STRUCTURE);
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
