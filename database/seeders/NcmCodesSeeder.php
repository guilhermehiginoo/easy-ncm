<?php

namespace Database\Seeders;

use App\Models\Ncm;
use Illuminate\Database\Seeder;

class NcmCodesSeeder extends Seeder
{
    public function run()
    {
        $stack = [];

        if (($handle = fopen(storage_path('app/public/ncm_csv/ncm-planilha.csv'), 'r')) !== false) {
            fgetcsv($handle);

            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                [$ncm_code, $ex, $description, $aliquot] = $data;

                $description = trim($description);

                // Detecta nível
                if (str_ends_with($description, '.')) {
                    $nivel = 1;
                } elseif (str_starts_with($description, '-') && str_ends_with($description, ':')) {
                    $nivel = 2;
                } elseif (str_starts_with($description, '--') || str_starts_with($description, '-')) {
                    $nivel = 3;
                } else {
                    $nivel = 3;
                }

                $descricaoLimpa = trim(str_replace(['--', '-', ':', '.'], '', $description));

                while (count($stack) >= $nivel) {
                    array_pop($stack);
                }

                $parent_id = end($stack)['id'] ?? null;

                if ($nivel <= 2) {
                    $nt          = null;
                    $aliquot_val = null;
                } else {
                    $nt          = strtoupper($aliquot) === 'NT' ? true : null;
                    $aliquot_val = is_numeric($aliquot) ? floatval($aliquot) : null;
                }

                if (!$ncm_code) {
                    continue;
                }

                $registro = Ncm::create([
                    'ncm_code'    => $ncm_code ?: null,
                    'ex'          => $ex ?: null,
                    'description' => $descricaoLimpa,
                    'parent_id'   => $parent_id,
                    'NT'          => $nt,
                    'aliquot'     => $aliquot_val,
                ]);

                $stack[$nivel] = $registro;
            }

            fclose($handle);
        }
    }
}
