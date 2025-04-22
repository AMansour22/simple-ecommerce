<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Defines the GraphQL input type for attribute values in mutations
 */
class AttributeValueInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeValueInput',
            'description' => 'Input type for specifying attribute values',
            'fields' => static fn(): array => [
                'id' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'Required attribute identifier',
                ],
                'value' => [
                    'type' => Type::nonNull(Type::string()),
                    'description' => 'Required attribute value',
                ],
            ],
        ]);
    }
}