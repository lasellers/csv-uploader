<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    protected $redirect = false;

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
