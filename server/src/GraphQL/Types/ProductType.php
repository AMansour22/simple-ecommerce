<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for a product
 */
class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'description' => 'Represents a product with all its details',
            'fields' => static fn(): array => [
                'id' => [
                    'type' => Type::string(),
                    'description' => 'Unique identifier for the product',
                ],
                'name' => [
                    'type' => Type::string(),
                    'description' => 'Name of the product',
                ],
                'inStock' => [
                    'type' => Type::boolean(),
                    'description' => 'Availability status of the product',
                ],
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                    'description' => 'List of image URLs for the product',
                ],
                'description' => [
                    'type' => Type::string(),
                    'description' => 'Detailed description of the product',
                ],
                'category' => [
                    'type' => Type::string(),
                    'description' => 'Category name the product belongs to',
                ],
                'attributes' => [
                    'type' => Type::listOf(new AttributeSetType()),
                    'description' => 'List of attribute sets for the product',
                ],
                'prices' => [
                    'type' => Type::listOf(new PriceType()),
                    'description' => 'List of prices in different currencies',
                ],
                'brand' => [
                    'type' => Type::string(),
                    'description' => 'Brand name of the product',
                ],
            ],
        ]);
    }
}