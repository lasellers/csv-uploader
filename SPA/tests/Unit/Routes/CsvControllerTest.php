<?php
/*
./vendor/bin/phpunit tests/Unit/Routes/CsvControllerTest.php
*/

namespace Tests\Unit\Routes;

use App\Http\Controllers\CsvController;
use Illuminate\Http\Response;
use Tests\TestCase;

class CsvControllerTest extends TestCase
{
    const MOCK_UNIT = ["MOCK"=>true];
    const MOCK_STRUCTURE = ["MOCK"];

    /**
     * @test
     */
    public function save()
    {
        $mock = \Mockery::mock('overload:CsvController');
        $mock->shouldReceive('save')->andReturn(self::MOCK_UNIT);
        $this->app->instance(CsvController::class, $mock);

        $response = $this->withoutMiddleware()
            ->json('POST', '/api/csv/save?unmapped_data=[]&data=[]', [])
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(self::MOCK_STRUCTURE);
    }
}
