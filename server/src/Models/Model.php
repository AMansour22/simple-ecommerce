<?php

namespace App\Models;

use App\Database;
use ReflectionClass;
use RuntimeException;

abstract class Model
{
    protected Database $db;
    protected static string $table;

    /**
     * Model constructor initializing database connection
     * and setting default table name if not specified
     *
     * @throws RuntimeException If database connection fails
     */
    public function __construct()
    {
        try {
            $this->db = Database::getInstance();
            
            // Set default table name based on class name if not explicitly defined
            if (!isset(static::$table)) {
                static::$table = strtolower((new ReflectionClass($this))->getShortName()) . 's';
            }
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to initialize database connection: ' . $e->getMessage());
        }
    }

    /**
     * Retrieves all records from the model's table
     *
     * @return array Array of all records
     * @throws RuntimeException If query execution fails
     */
    public function all(): array
    {
        try {
            return $this->db->query('SELECT * FROM ' . static::$table)->get();
        } catch (\Exception $e) {
            throw new RuntimeException('Failed to fetch all records: ' . $e->getMessage());
        }
    }

    /**
     * Finds a single record by column value
     *
     * @param string $value The value to search for
     * @param string|null $column The column to search in (defaults to 'id')
     * @return array|null The found record or null if not found
     * @throws RuntimeException If query execution fails
     */
    public function find(string $value, ?string $column = 'id'): ?array
    {
        try {
            return $this->db->query(
                'SELECT * FROM ' . static::$table . ' WHERE ' . $column . ' = :value LIMIT 1',
                ['value' => $value]
            )->fetch(); // Fetch a single record
        } catch (\Exception $e) {
            throw new RuntimeException("Failed to find record by $column: " . $e->getMessage());
        }
    }
}
