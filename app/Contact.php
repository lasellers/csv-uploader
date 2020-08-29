<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\CustomAttributes;
use phpDocumentor\Reflection\Types\Integer;

class Contact extends Model
{
    protected $fillable = [
        'team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'
    ];

    protected $casts = [
        'team_id' => 'integer',
        'sticky_phone_number_id' => 'integer',
        'created_at' => 'date',
        'updated_at' => 'date',
    ];

    //
    public function CustomAttributes(): HasMany
    {
        return $this->hasMany(CustomAttributes::class);
    }
}
