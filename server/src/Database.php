<?php

namespace App;

use PDO;
use PDOException;
use RuntimeException;

class Database
{
    private PDO $pdo;
    private $statement;
    private static ?Database $instance = null;

    public function __construct()
    {
        try {
            
            $host = $_ENV['DB_HOST'];
            $port = $_ENV['DB_PORT'];
            $dbname = $_ENV['DB_NAME']; 
            $username = $_ENV['DB_USER'];
            $password = $_ENV['DB_PASSWORD'];
            $charset = $_ENV['DB_CHARSET'];

            $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $e) {
            throw new RuntimeException("Database connection failed: {$e->getMessage()}");
        }
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function query(string $query, array $params = []): self
    {
        try {
            $this->statement = $this->pdo->prepare($query);
            $this->statement->execute($params);
            return $this;
        } catch (PDOException $e) {
            throw new RuntimeException("Query execution failed: {$e->getMessage()}");
        }
    }

    public function get(): array
    {
        return $this->statement->fetchAll();
    }

    public function fetch(): ?array
    {
        $result = $this->statement->fetch();
        return $result !== false ? $result : null;
    }

    public function fetchOrFail(): array
    {
        $result = $this->fetch();
        if ($result === null) {
            throw new RuntimeException("Record not found");
        }
        return $result;
    }

    public function fetchColumn()
    {
        return $this->statement->fetchColumn();
    }

    public function getLastInsertId(): string
    {
        return $this->pdo->lastInsertId();
    }

    public function beginTransaction(): bool
    {
        return $this->pdo->beginTransaction();
    }

    public function commit(): bool
    {
        return $this->pdo->commit();
    }

    public function rollback(): bool
    {
        return $this->pdo->rollBack();
    }
}