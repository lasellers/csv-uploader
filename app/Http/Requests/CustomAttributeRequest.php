<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomAttributeRequest extends FormRequest
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
            'contact_id' => 'required|numeric',
            'key' => 'required|string|max:255',
            'value'=>'required|string|max:255'
        ];
    }
}
