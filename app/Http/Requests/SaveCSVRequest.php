<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveCSVRequest extends FormRequest
{
    protected $expectsJson = true;
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'data' => '',
            'unmapped_data' => '',
            'headers' => '',
            'mapped_columns' => '',
        ];
    }
}