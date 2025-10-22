<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ncm extends Model
{
    protected $table = 'ncm_codes';

    protected $fillable = [
        'code',
        'description',
        'NT',
        'aliquot',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(Ncm::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Ncm::class, 'parent_id');
    }
}
