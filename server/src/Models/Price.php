<?php

namespace App\Models;

use RuntimeException;

class Price extends Model
{
    /**
     * Retrieves all prices for a specific product
     *
     * @param mixed $productId The ID of the product to fetch prices for
     * @return array Array of formatted prices with currency information
     * @throws RuntimeException If query execution fails or invalid product ID provided
     */
    public static function getByProductId($productId): array
    {
        if (empty($productId)) {
            throw new RuntimeException('Product ID cannot be empty');
        }

        try {
            $prices = (new static)->db->query(
                'SELECT 
                    p.amount, 
                    c.label, 
                    c.symbol 
                FROM 
                    prices p
                JOIN
                    currencies c
                ON
                    p.currency = c.label
                WHERE
                    p.product_id = :productId',
                ['productId' => $productId]
            )->get();

            $productPrices = [];
            foreach ($prices as $price) {
                $productPrices[] = [
                    'amount' => number_format((float)$price['amount'], 2, '.', ''),
                    'currency' => [
                        'label' => $price['label'],
                        'symbol' => $price['symbol'],
                    ],
                ];
            }

            return $productPrices;
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch prices for product ID ' . $productId . ': ' . $e->getMessage());
        }
    }
}