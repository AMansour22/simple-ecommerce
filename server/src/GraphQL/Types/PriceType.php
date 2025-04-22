<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for product pricing
 */
class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'description' => 'Represents pricing information for a product',
            'fields' => static fn(): array => [
                'amount' => [
                    'type' => Type::string(), // Using string to preserve decimal formatting
                    'description' => 'Price amount formatted as a string',
                ],
                'currency' => [
                    'type' => new CurrencyType(),
                    'description' => 'Currency details for the price',
                ],
            ],
        ]);
    }
}