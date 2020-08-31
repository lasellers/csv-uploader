<?php

namespace App\Http\Controllers;

use App\Contact;
use App\CustomAttribute;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $contacts = Contact::with(['customAttributes'])
                ->orderBy('id', 'desc')
                ->get();
            return response()->json($contacts->toArray());
        } catch (\Exception $e) {
            return self::returnAPIError($e);
        }
    }

    /**
     * Delete contact
     * ContactIdRequest
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $contact = Contact::find($id);
            if (!is_null($contact)) {
                $result = $contact->delete();
                return response()->json(['result' => $result]);
            }
            return response()->json(['result' => false]);
        } catch (\Exception $e) {
            return self::returnAPIError($e);
        }
    }

    /**
     * Delete custom attributes
     * ContactIdRequest
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function customAttributeDestroy($id)
    {
        try {
            $customAttribute = CustomAttribute::find($id);
            if (!is_null($customAttribute)) {
                $result = $customAttribute->delete();
                return response()->json(['result' => $result]);
            }
            return response()->json(['result' => false]);
        } catch (\Exception $e) {
            return self::returnAPIError($e);
        }
    }
}
