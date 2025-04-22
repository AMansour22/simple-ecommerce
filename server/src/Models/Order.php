<?php

namespace App\Models;

use App\Database;
use InvalidArgumentException;
use RuntimeException;

class Order extends Model
{
    // Explicitly defined table name for orders
    protected static string $table = 'orders';

    /**
     * Creates a new order with default values
     *
     * @param Database $db Database connection instance
     * @return array Result array containing success status and order ID or error message
     * @throws RuntimeException If order creation fails
     */
    public static function create(Database $db): array
    {
        try {
            $result = $db->query(
                'INSERT INTO ' . static::$table . ' (total_amount, total_currency) VALUES (?, ?)',
                [0, 'USD']
            );

            if (!$result) {
                return [
                    'success' => false,
                    'error' => 'Failed to create order'
                ];
            }

            return [
                'success' => true,
                'orderId' => (int)$db->getLastInsertId()
            ];
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to create order: ' . $e->getMessage());
        }
    }

    /**
     * Updates an existing order's total amount and currency
     *
     * @param Database $db Database connection instance
     * @param int $orderId The ID of the order to update
     * @param float $totalAmount New total amount
     * @param string $currency New currency code (ISO 4217 format recommended)
     * @return array Result array containing success status or error message
     * @throws InvalidArgumentException If invalid parameters provided
     * @throws RuntimeException If database update fails
     */
    public static function update(Database $db, int $orderId, float $totalAmount, string $currency): array
    {
        if ($orderId <= 0) {
            throw new InvalidArgumentException('Order ID must be a positive integer');
        }
        if ($totalAmount < 0) {
            throw new InvalidArgumentException('Total amount cannot be negative');
        }
        if (empty($currency)) {
            throw new InvalidArgumentException('Currency cannot be empty');
        }

        try {
            $result = $db->query(
                'UPDATE ' . static::$table . ' SET total_amount = ?, total_currency = ? WHERE id = ?',
                [$totalAmount, $currency, $orderId]
            );

            if (!$result) {
                return [
                    'success' => false,
                    'error' => 'Failed to update order'
                ];
            }

            return ['success' => true];
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to update order ID ' . $orderId . ': ' . $e->getMessage());
        }
    }
}