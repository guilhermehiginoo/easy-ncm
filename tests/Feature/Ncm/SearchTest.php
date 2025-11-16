<?php

namespace Feature\Ncm;

use App\Models\User;
use App\Services\{OpenAiService, QdrantService};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;
    public function test_vector_search_works()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->mock(OpenAiService::class, function ($mock) {
            $mock->shouldReceive('createVector')
                ->once()
                ->andReturn(array_fill(0, 1536, 0.1));
        });

        $this->mock(QdrantService::class, function ($mock) {
            $mock->shouldReceive('searchPoints')
                ->once()
                ->andReturn([
                    'result' => [
                        'points' => [
                            [
                                'id'      => 123,
                                'version' => 1,
                                'score'   => 0.95,
                                'payload' => [
                                    'ncm_code'    => '0101.21.00',
                                    'description' => 'Equinos vivos',
                                ],
                            ],
                        ],
                    ],
                    'status' => 'ok',
                ]);
        });

        $response = $this->getJson('/ncm/search?query=Equinos');

        $response->dump();

        $response->assertStatus(200);
    }

}
