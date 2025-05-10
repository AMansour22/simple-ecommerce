<?php

namespace App\Models;

use RuntimeException;

class Product extends Model
{
    /**
     * Retrieves all products, optionally filtered by category
     *
     * @param string|null $category Category to filter by (optional)
     * @return array Array of products with their details
     * @throws RuntimeException If query execution fails
     */
    public function all(?string $category = null): array
    {
        try {
            $query = 'SELECT * FROM ' . static::$table;
            $params = [];

            if ($category && strtolower($category) !== 'all') {
                $query .= ' WHERE category = :category';
                $params['category'] = $category;
            }

            $products = $this->db->query($query, $params)->get();

            // Enrich each product with additional details
            foreach ($products as &$product) {
                $this->fetchProductDetails($product);
            }

            return $products;
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch products: ' . $e->getMessage());
        }
    }

    /**
     * Finds a single product and enriches it with additional details
     *
     * @param string $value The value to search for
     * @param string|null $column The column to search in (defaults to 'id')
     * @return array|null The found product with details or null if not found
     * @throws RuntimeException If query execution fails
     */
    public function find(string $value, ?string $column = null): ?array
    {
        try {
            $product = parent::find($value, $column ?? 'id');

            if ($product) {
                $this->fetchProductDetails($product);
            }

            return $product;
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to find product: ' . $e->getMessage());
        }
    }

    /**
     * Enriches a product array with gallery, prices, and attributes
     *
     * @param array &$product The product array to enrich (passed by reference)
     * @throws RuntimeException If detail fetching fails
     */
    private function fetchProductDetails(array &$product): void
    {
        try {
            // Decode gallery JSON and ensure it's an array
            $gallery = json_decode($product['gallery'] ?? '[]', true);
            $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

            // Fetch prices and attributes for the product
            $price = new Price();
            $attribute = new Attribute();
            $product['prices'] = $price->getByProductId($product['id']);
            $product['attributes'] = $attribute->getByProductId($product['id']);
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch product details: ' . $e->getMessage());
        }
    }
}