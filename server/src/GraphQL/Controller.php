<?php

namespace App\GraphQL;

use Throwable;
use RuntimeException;
use GraphQL\Type\Schema;
use App\GraphQL\Query;
use App\GraphQL\Mutation;
use GraphQL\Type\SchemaConfig;
use GraphQL\GraphQL as GraphQLBase;

/**
 * Handles GraphQL requests and responses
 */
class Controller
{
    /**
     * Processes GraphQL requests and returns JSON response
     *
     * @return string JSON-encoded response
     */
    public static function handle(): string
    {
        try {
            $queryType = Query::defineQueries();
            $mutationType = Mutation::defineMutations();

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $output = self::executeQuery($schema);
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'trace' => $e->getTraceAsString(), // Consider removing in production
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output, JSON_THROW_ON_ERROR);
    }

    /**
     * Executes the GraphQL query against the schema
     *
     * @param Schema $schema The GraphQL schema to execute against
     * @return array The query execution result
     * @throws RuntimeException If input cannot be read or parsed
     */
    private static function executeQuery(Schema $schema): array
    {
        $rawInput = file_get_contents('php://input');
        if ($rawInput === false) {
            throw new RuntimeException('Failed to read input stream');
        }

        $input = json_decode($rawInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Invalid JSON input: ' . json_last_error_msg());
        }

        $query = $input['query'] ?? throw new RuntimeException('Query is required');
        $variableValues = $input['variables'] ?? null;

        $rootValue = ['prefix' => 'You said: '];
        $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
        return $result->toArray();
    }
}