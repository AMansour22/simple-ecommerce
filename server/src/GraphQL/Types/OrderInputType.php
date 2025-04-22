<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Defines the GraphQL input type for order creation
 */
class OrderInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderInput',
            'description' => 'Input type for creating or updating an order',
            'fields' => static fn(): array => [
                'items' => [
                    'type' => Type::listOf(new OrderItemInputType()),
                    'description' => 'List of items to include in the order',
                ],
            ],
        ]);
    }
}