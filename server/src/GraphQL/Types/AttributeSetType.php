<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

/**
 * Defines the GraphQL type for a set of related attributes
 */
class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'description' => 'Represents a collection of related product attributes',
            'fields' => static fn(): array => [
                'id' => [
                    'type' => Type::string(),
                    'description' => 'Unique identifier for the attribute set',
                ],
                'name' => [
                    'type' => Type::string(),
                    'description' => 'Name of the attribute set',
                ],
                'type' => [
                    'type' => Type::string(),
                    'description' => 'Type of attributes in the set (e.g., text, swatch)',
                ],
                'items' => [
                    'type' => Type::listOf(new AttributeType()),
                    'description' => 'List of individual attribute values in the set',
                ],
            ],
        ]);
    }
}