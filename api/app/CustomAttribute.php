<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomAttribute extends Model
{
    public $timestamps = null;

    protected $fillable = [
        'contact_id', 'key', 'value'
    ];

    //
    public function contact(): BelongsTo
    {
        $this->belongsTo(Contact::class);
    }
}
