<?php
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class CustomAttributeRequest extends FormRequest
{
    // FormRequest tries to redirect us to an url by default -- this makes it return a proper json error.
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY));
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
            'contact_id' => 'required|numeric',
            'key' => 'required|string|max:255',
            'value'=>'required|string|max:255'
        ];
    }
}
