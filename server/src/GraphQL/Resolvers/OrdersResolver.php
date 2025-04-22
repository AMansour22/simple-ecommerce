<?php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Database;
use App\Models\OrderItem;
use InvalidArgumentException;
use RuntimeException;

/**
 * Resolver for order-related GraphQL mutations
 */
class OrdersResolver
{
    /**
     * Creates a new order with the provided items
     *
     * @param array $args Order input data
     * @return string Success message with order ID
     * @throws InvalidArgumentException If validation fails
     * @throws RuntimeException If order creation fails
     */
    public static function store(array $args): string
    {
        if (empty($args['items'])) {
            throw new InvalidArgumentException('Order items are required');
        }

        $db = new Database();
        $db->beginTransaction();

        try {
            $orderResult = Order::create($db);
            if (!$orderResult['success']) {
                throw new RuntimeException($orderResult['error']);
            }
            $orderId = $orderResult['orderId'];

            $totalAmount = 0.0;
            $currency = null;

            foreach ($args['items'] as $item) {
                self::validateItemAttributes($db, $item);
                $productDetails = self::calculatePaidAmount($db, $item);

                $insertResult = OrderItem::insertItem($db, $orderId, $productDetails);
                if (!$insertResult['success']) {
                    throw new RuntimeException($insertResult['error']);
                }

                $totalAmount += (float)$productDetails['paidAmount'];
                $currency = $currency ?? $productDetails['paidCurrency'];
            }

            $updateResult = Order::update($db, $orderId, $totalAmount, $currency);
            if (!$updateResult['success']) {
                throw new RuntimeException($updateResult['error']);
            }

            $db->commit();
            return "Order placed successfully! Order ID: $orderId";
        } catch (\Exception $e) {
            $db->rollback();
            throw $e instanceof InvalidArgumentException || $e instanceof RuntimeException 
                ? $e 
                : new RuntimeException('Failed to place order: ' . $e->getMessage());
        }
    }

    /**
     * Validates item attributes against product requirements
     *
     * @param Database $db Database connection
     * @param array $item Item data to validate
     * @throws InvalidArgumentException If validation fails
     */
    private static function validateItemAttributes(Database $db, array $item): void
    {
        $productId = $item['productId'] ?? throw new InvalidArgumentException('Product ID is required');

        $product = $db->query('SELECT inStock, name FROM products WHERE id = ?', [$productId])->fetch();
        if (!$product) {
            throw new InvalidArgumentException("Product with ID $productId not found");
        }

        if (!$product['inStock']) {
            throw new InvalidArgumentException("Product '{$product['name']}' is out of stock");
        }

        $attributeCount = $db->query(
            'SELECT COUNT(DISTINCT attribute_id) FROM product_attributes WHERE product_id = ?',
            [$productId]
        )->fetchColumn();

        if (!isset($item['attributeValues']) || $attributeCount != count($item['attributeValues'])) {
            throw new InvalidArgumentException("Product '{$product['name']}' requires $attributeCount attribute values");
        }

        foreach ($item['attributeValues'] as $attribute) {
            $exists = $db->query(
                'SELECT COUNT(*) FROM product_attributes WHERE id = ? AND value = ? LIMIT 1',
                [$attribute['id'], $attribute['value']]
            )->fetchColumn();

            if (!$exists) {
                throw new InvalidArgumentException(
                    "Invalid attribute value '{$attribute['value']}' for product '{$product['name']}'"
                );
            }
        }
    }

    /**
     * Calculates payment details for an order item
     *
     * @param Database $db Database connection
     * @param array $item Item data
     * @return array Calculated product details
     * @throws InvalidArgumentException If product or price data is invalid
     */
    private static function calculatePaidAmount(Database $db, array $item): array
    {
        $productId = $item['productId'];
        $quantity = max(1, $item['quantity'] ?? 1); // Ensure minimum quantity of 1

        $product = $db->query('SELECT name FROM products WHERE id = ?', [$productId])->fetch();
        if (!$product) {
            throw new InvalidArgumentException("Product with ID $productId not found");
        }

        $price = $db->query('SELECT amount, currency FROM prices WHERE product_id = ?', [$productId])->fetch();
        if (!$price) {
            throw new RuntimeException("Price not found for product ID $productId");
        }

        $paidAmount = (float)$price['amount'] * $quantity;
        $attributeValues = array_column($item['attributeValues'] ?? [], 'value', 'id');
        $attributeValuesJson = json_encode([$attributeValues], JSON_THROW_ON_ERROR);

        return [
            'productId' => $productId,
            'productName' => $product['name'],
            'attributeValues' => $attributeValuesJson,
            'quantity' => $quantity,
            'paidAmount' => $paidAmount,
            'paidCurrency' => $price['currency'],
        ];
    }
}