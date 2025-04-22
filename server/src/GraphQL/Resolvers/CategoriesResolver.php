<?php

namespace App\GraphQL\Resolvers;

use App\Models\Category;
use RuntimeException;

/**
 * Resolver for category-related GraphQL queries
 */
class CategoriesResolver
{
    /**
     * Fetches all categories
     *
     * @return array List of categories
     * @throws RuntimeException If category retrieval fails
     */
    public static function index(): array
    {
        try {
            return Category::all();
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch categories: ' . $e->getMessage());
        }
    }
}