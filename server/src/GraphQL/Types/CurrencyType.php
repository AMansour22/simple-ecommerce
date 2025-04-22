<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for currency information
 */
class CurrencyType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'description' => 'Represents currency details for pricing',
            'fields' => static fn(): array => [
                'label' => [
                    'type' => Type::string(),
                    'description' => 'ISO currency code (e.g., USD, EUR)',
                ],
                'symbol' => [
                    'type' => Type::string(),
                    'description' => 'Currency symbol (e.g., $, €)',
                ],
            ],
        ]);
    }
}