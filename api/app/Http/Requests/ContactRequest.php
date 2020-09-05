<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class ContactRequest extends FormRequest
{
    // FormRequest tries to redirect us to an url by default -- this makes it return a proper json error.
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(
            [errors => $validator->errors()],
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
     * We don't actually use these rules in a form validation, but in the CsvService.
     * Having them here is merely to keep all the validator rules in one folder.
     *
     * @return array
     */
    public static function rules()
    {
        return [
            'team_id' => 'required|numeric',
            'name' => 'required|string|nullable',
            'phone' => 'required|string',
            'email' => 'required|string|nullable',
            'sticky_phone_number_id' => 'required|numeric|nullable',
            'created_at' => 'required|date|nullable|min:10',
            'updated_at' => 'required|date|nullable|min:10'
        ];
    }
}
