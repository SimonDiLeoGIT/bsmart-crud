<?php

namespace App\Utils;

use Illuminate\Validation\ValidationException;

class ResponseHandler
{
    /**
     * Formatea una respuesta de error de validación.
     *
     * @param ValidationException $e
     * @return \Illuminate\Http\JsonResponse
     */
    public function formatValidationErrorResponse(ValidationException $e)
    {
        $errors = $e->errors();
        $firstErrorKey = array_key_first($errors);
        $firstErrorMessage = $errors[$firstErrorKey][0];

        return response()->json([
            'error' => 'Validation Error',
            'message' => $firstErrorMessage,
            'code' => 400
        ], 400);
    }

    public function formatErrorResponse(string $error, string $message, int $code)
    {
        return response()->json([
            'error' => $error,
            'message' => $message,
            'code' => $code
        ], $code);
    }
}
