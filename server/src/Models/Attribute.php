<?php

namespace App\Models;

class Attribute extends Model
{
    /**
     * Retrieves all attributes associated with a specific product ID
     *
     * @param mixed $productId The ID of the product to fetch attributes for
     * @return array An array of attributes with their values organized by attribute ID
     * @throws RuntimeException If query execution fails or invalid product ID provided
     */
    public static function getByProductId($productId): array
    {
        if (empty($productId)) {
            throw new RuntimeException('Product ID cannot be empty');
        }

        try {
            $attributes = [];
            
            // Fetch attributes with their details through a JOIN query
            $items = (new static)->db->query(
                'SELECT 
                    pa.*, 
                    a.name as attribute_name, 
                    a.type as attribute_type
                FROM 
                    product_attributes pa
                JOIN 
                    attributes a
                ON 
                    pa.attribute_id = a.id 
                WHERE 
                    product_id = :productId',
                ['productId' => $productId]
            )->get();

            // Structure attributes by their IDs
            foreach ($items as $item) {
                $attributeId = $item['attribute_id'];

                if (!isset($attributes[$attributeId])) {
                    $attributes[$attributeId] = [
                        'id' => $item['id'],
                        'attribute_id' => $attributeId,
                        'name' => $item['attribute_name'],
                        'type' => $item['attribute_type'],
                        'items' => [],
                    ];
                }

                $attributes[$attributeId]['items'][] = [
                    'id' => $item['id'],
                    'attribute_id' => $attributeId,
                    'value' => $item['value'],
                    'displayValue' => $item['displayValue'],
                ];
            }

            return $attributes;
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch attributes for product ID ' . $productId . ': ' . $e->getMessage());
        }
    }
}