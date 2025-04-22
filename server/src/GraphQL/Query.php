<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\CategoryType;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines GraphQL query operations
 */
class Query
{
    /**
     * Creates and returns the Query type definition
     *
     * @return ObjectType The configured query type
     */
    public static function defineQueries(): ObjectType
    {
        $productType = new ProductType();

        return new ObjectType([
            'name' => 'Query',
            'description' => 'Root query type for read operations',
            'fields' => static fn(): array => [
                'echo' => [
                    'type' => Type::string(),
                    'description' => 'Echoes back a message with a prefix',
                    'args' => [
                        'message' => [
                            'type' => Type::string(),
                            'description' => 'Message to echo',
                        ],
                    ],
                    'resolve' => static fn($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                ],
                'categories' => [
                    'type' => Type::listOf(new CategoryType()),
                    'description' => 'Retrieves all product categories',
                    'resolve' => static fn(): array => Resolvers\CategoriesResolver::index(),
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'description' => 'Retrieves products, optionally filtered by category',
                    'args' => [
                        'category' => [
                            'type' => Type::string(),
                            'description' => 'Category filter (optional)',
                        ],
                    ],
                    'resolve' => static fn($rootValue, array $args): array => Resolvers\ProductsResolver::index($args['category'] ?? null),
                ],
                'product' => [
                    'type' => $productType,
                    'description' => 'Retrieves a single product by ID',
                    'args' => [
                        'id' => [
                            'type' => Type::nonNull(Type::string()),
                            'description' => 'Required product identifier',
                        ],
                    ],
                    'resolve' => static fn($rootValue, array $args): array => Resolvers\ProductsResolver::show($args['id']),
                ],
            ],
        ]);
    }
}