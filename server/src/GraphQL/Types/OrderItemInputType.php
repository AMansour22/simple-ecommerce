<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Defines the GraphQL input type for order items in mutations
 */
class OrderItemInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemInput',
            'description' => 'Input type for specifying order item details',
            'fields' => static fn(): array => [
                'productId' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'Required product identifier',
                ],
                'quantity' => [
                    'type' => Type::nonNull(Type::int()),
                    'description' => 'Required quantity of the product',
                ],
                'attributeValues' => [
                    'type' => Type::listOf(new AttributeValueInputType()),
                    'description' => 'List of attribute selections for the product',
                ],
            ],
        ]);
    }
}