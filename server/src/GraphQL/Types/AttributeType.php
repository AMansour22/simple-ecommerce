<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for an individual attribute value
 */
class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'description' => 'Represents a single attribute value for a product',
            'fields' => static fn(): array => [
                'id' => [
                    'type' => Type::string(),
                    'description' => 'Unique identifier for the attribute value',
                ],
                'attribute_id' => [
                    'type' => Type::string(),
                    'description' => 'Identifier of the parent attribute set',
                ],
                'value' => [
                    'type' => Type::string(),
                    'description' => 'The actual value of the attribute',
                ],
                'displayValue' => [
                    'type' => Type::string(),
                    'description' => 'Human-readable representation of the value',
                ],
            ],
        ]);
    }
}