<?php

namespace App\Models;

use App\Database;
use InvalidArgumentException;
use RuntimeException;

class OrderItem extends Model
{
    // Explicitly defined table name for order items
    protected static string $table = 'order_items';

    /**
     * Inserts a new item into an order
     *
     * @param int $orderId The ID of the order
     * @param array $productDetails Product details including required fields: productId, productName, etc.
     * @return array Result array containing success status and optional error message
     * @throws InvalidArgumentException If required product details are missing
     * @throws RuntimeException If database insertion fails
     */
    public function insertItem(int $orderId, array $productDetails): array
    {
        $requiredFields = ['productId', 'productName', 'attributeValues', 'quantity', 'paidAmount', 'paidCurrency'];
        foreach ($requiredFields as $field) {
            if (!array_key_exists($field, $productDetails)) {
                throw new InvalidArgumentException("Missing required field: $field");
            }
        }

        try {
            $result = $this->db->query(
                'INSERT INTO ' . static::$table . 
                ' (order_id, product_id, product_name, attribute_values, quantity, paid_amount, paid_currency) ' .
                'VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    $orderId,
                    $productDetails['productId'],
                    $productDetails['productName'],
                    $productDetails['attributeValues'],
                    $productDetails['quantity'],
                    $productDetails['paidAmount'],
                    $productDetails['paidCurrency'],
                ]
            );

            if (!$result) {
                return [
                    'success' => false,
                    'error' => 'Failed to insert order item'
                ];
            }

            return ['success' => true];
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to insert order item: ' . $e->getMessage());
        }
    }
}