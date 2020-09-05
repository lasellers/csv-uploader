<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Contact;

class CustomAttribute extends Model
{
    public $timestamps = null;

    protected $fillable = [
        'contact_id', 'key', 'value'
    ];

//    protected $casts = [
//        'contact_id' => 'integer',
//    ];

    //
    public function contact(): BelongsTo
    {
        $this->belongsTo(Contact::class);
    }
}
