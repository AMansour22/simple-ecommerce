<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderInputType;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines GraphQL mutation operations
 */
class Mutation
{
    /**
     * Creates and returns the Mutation type definition
     *
     * @return ObjectType The configured mutation type
     */
    public static function defineMutations(): ObjectType
    {
        return new ObjectType([
            'name' => 'Mutation',
            'description' => 'Root mutation type for write operations',
            'fields' => static fn(): array => [
                'sum' => [
                    'type' => Type::int(),
                    'description' => 'Adds two integers together',
                    'args' => [
                        'x' => [
                            'type' => Type::int(),
                            'description' => 'First number to add',
                        ],
                        'y' => [
                            'type' => Type::int(),
                            'description' => 'Second number to add',
                        ],
                    ],
                    'resolve' => static fn($calc, array $args): int => $args['x'] + $args['y'],
                ],
                'placeOrder' => [
                    'type' => Type::string(),
                    'description' => 'Places a new order and returns confirmation message',
                    'args' => [
                        'OrderInput' => [
                            'type' => Type::nonNull(new OrderInputType()),
                            'description' => 'Required order details',
                        ],
                    ],
                    'resolve' => static fn($rootValue, array $args): string => Resolvers\OrdersResolver::store($args['OrderInput']),
                ],
            ],
        ]);
    }
}