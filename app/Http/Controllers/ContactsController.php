<?php

namespace App\Http\Controllers;

use App\Contact;
use App\CustomAttributes;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            return response()->json([
                'message' => 'Contacts lookup error ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
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
            if(!is_null($contact)) {
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
    public function customAttributesDestroy($id)
    {
        try {
            $customAttribute = CustomAttributes::find($id);
            if(!is_null($customAttribute)) {
                $result = $customAttribute->delete();
                return response()->json(['result' => $result]);
            }
            return response()->json(['result' => false]);
        } catch (\Exception $e) {
            return self::returnAPIError($e);
        }
    }

}
