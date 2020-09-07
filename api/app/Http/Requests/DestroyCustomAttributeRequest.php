<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class DestroyCustomAttributeRequest extends FormRequest
{
    // FormRequest tries to redirect us to an url by default -- this makes it return a proper json error.
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(
            ['errors' => $validator->errors()],
            Response::HTTP_UNPROCESSABLE_ENTITY
        ));
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'numeric'
        ];
    }
}
