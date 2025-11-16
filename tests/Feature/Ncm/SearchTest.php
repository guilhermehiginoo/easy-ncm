<?php

namespace Feature\Ncm;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;
    public function test_vector_search_works()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->getJson('/ncm/search?query=eletrônicos');

        $response->dump();

        $response->assertStatus(200);
    }

}
