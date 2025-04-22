<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for a product category
 */
class CategoryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Category',
            'description' => 'Represents a product category',
            'fields' => static fn(): array => [
                'name' => [
                    'type' => Type::string(),
                    'description' => 'Name of the category',
                ],
            ],
        ]);
    }
}