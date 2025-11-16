<?php

namespace Feature\Ncm;

use App\Models\User;
use App\Services\OpenAiService;
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

        $response = $this->getJson('/ncm/search?query=Equinos');

        $response->dump();

        $response->assertStatus(200);
    }

}
