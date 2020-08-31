<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

/**
 * Class Controller
 * @package App\Http\Controllers
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Standardized general 500 Server Error
     *
     * Note: For development we should use Telescope to collate all of the error information in detail. This is only
     * for passing the info back to the frontend.
     *
     * @param \Exception $e
     * @param string $errorString
     * @return JsonResponse
     */
    public static function returnAPIError(
        \Exception $e,
        string $errorString = "API Error"
    ): JsonResponse {
        if (app()->environment('production')) {
            return response()->json([
                'message' => $errorString,
                Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        return response()->json([
            'message' => $errorString . ' ' . $e->getCode() . ' ' . $e->getMessage(),
            Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    /**
     * Standardized general 422 Unprocessable Entity Error
     *
     * Note: For development we should use Telescope to collate all of the error information in detail. This is only
     * for passing the info back to the frontend.
     *
     * @param \Exception $e
     * @param string $errorString
     * @return JsonResponse
     */
    public static function returnAPIUnprocessableError(
        array $errors,
        string $errorString = "Unprocessable Entity Error"
    ): JsonResponse {
        if (app()->environment('production')) {
            return response()->json([
                'message' => $errorString,
                Response::HTTP_UNPROCESSABLE_ENTITY
            ]);
        }

        return response()->json([
            'message' => $errorString . ' ' . implode(',', $errors),
            Response::HTTP_UNPROCESSABLE_ENTITY
        ]);
    }
}
