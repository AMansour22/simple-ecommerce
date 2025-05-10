<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;
use RuntimeException;

/**
 * Resolver for product-related GraphQL queries
 */
class ProductsResolver
{
    /**
     * Fetches all products, optionally filtered by category
     *
     * @param string|null $category Category filter (optional)
     * @return array List of products
     * @throws RuntimeException If product retrieval fails
     */
    public static function index(?string $category = null): array
    {
        try {
            $product = new Product();
            return $product->all($category);
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch products: ' . $e->getMessage());
        }
    }

    /**
     * Fetches a single product by ID
     *
     * @param string $productId Product identifier
     * @return array Product details
     * @throws RuntimeException If product retrieval fails
     */
    public static function show(string $productId): array
    {
        try {
            $product = new Product();
            $result = $product->find($productId);
            if (!$result) {
                throw new RuntimeException("Product with ID $productId not found");
            }
            return $result;
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch product: ' . $e->getMessage());
        }
    }
}