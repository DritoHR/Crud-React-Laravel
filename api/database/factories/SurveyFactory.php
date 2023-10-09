<?php

namespace Database\Factories;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survey>
 */
class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = $this->faker->randomElement(['LUZ', 'GAS', 'DUAL']);
        $subproductOptions = [];

        if ($product === 'LUZ' || $product === 'GAS') {
            $subproductOptions = ['TARIFA PLANA', 'TARIFA POR USO'];
        } elseif ($product === 'DUAL') {
            $subproductOptions = ['PLENA', 'TOTAL'];
        }

        return [
            'customer_dni' => $this->faker->unique()->regexify('[0-9]{8}[A-Z]'),
            'product' => $product,
            'subproduct' => $this->faker->randomElement($subproductOptions),
            'subproduct_gas' => ($product === 'LUZ' || $product === 'GAS') ? null : $this->faker->randomElement(['PLENA', 'TOTAL']),
            'maintenance' => ($product === 'DUAL') ? null : $this->faker->randomElement(['SI', 'NO']),
            'maintenance_light' => ($product === 'DUAL') ? $this->faker->randomElement(['SI', 'NO']) : null,
            'maintenance_gas' => ($product === 'DUAL') ? $this->faker->randomElement(['SI', 'NO']) : null,
            'state' => $this->faker->randomElement(['VENDIDO', 'EN PROCESO', 'NO VENDIDO', 'NO VÁLIDO']),
        ];        
    }
}
