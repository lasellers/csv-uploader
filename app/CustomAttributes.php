<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Contact;

class CustomAttributes extends Model
{
    //
    public function Contact(): BelongsTo
    {
        $this->belongsTo(Contact::class);
    }
}
