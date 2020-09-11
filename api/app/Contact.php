<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\CustomAttribute;
use phpDocumentor\Reflection\Types\Integer;

class Contact extends Model
{
    protected $fillable = [
        'team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'
    ];

    //
    public function customAttributes(): HasMany
    {
        return $this->hasMany(CustomAttribute::class);
    }
}
