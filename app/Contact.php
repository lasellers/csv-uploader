<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\CustomAttributes;

class Contact extends Model
{
    //
    public function CustomAttributes(): HasMany
    {
        return $this->hasMany(CustomAttributes::class);
    }
}
