<?php

namespace Database\Seeders;

use App\Models\Ncm;
use Illuminate\Database\Seeder;

class NcmCodesSeeder extends Seeder
{
    public function run()
    {
        $stack = [];

        $filePath = storage_path('app/public/ncm_csv/ncm-planilha.csv');

        if (!file_exists($filePath)) {
            $this->command->error("Arquivo CSV não encontrado em: $filePath");

            return;
        }

        if (($handle = fopen($filePath, 'r')) !== false) {
            fgetcsv($handle);

            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                [$ncm_code, $ex, $description, $aliquot] = $data;
                $description                             = trim($description);

                if (!$description) {
                    continue;
                }

                $level     = 2;
                $parent_id = null;

                if (str_ends_with($description, '.')) {
                    $level     = 1;
                    $parent_id = null;
                } elseif (str_starts_with($description, '--')) {
                    $level     = 3;
                    $parent_id = $stack[2]->id ?? $stack[1]->id ?? null;
                } elseif (str_starts_with($description, '-') && str_ends_with($description, ':')) {
                    $level     = 2;
                    $parent_id = $stack[1]->id ?? null;
                } elseif (!str_starts_with($description, '-') && !str_ends_with($description, '.')) {
                    $level     = 2;
                    $parent_id = $stack[1]->id ?? null;
                } elseif (str_starts_with($description, '-') && !str_ends_with($description, ':')) {
                    $level     = 2;
                    $parent_id = $stack[1]->id ?? null;
                }

                $descricaoLimpa = trim(str_replace(['--', '-', ':', '.'], '', $description));

                if ($level <= 2) {
                    $nt          = null;
                    $aliquot_val = null;
                } else {
                    $nt          = strtoupper($aliquot) === 'NT' ? true : null;
                    $aliquot_val = is_numeric($aliquot) ? floatval($aliquot) : null;
                }

                if (!$ncm_code) {
                    continue;
                }

                $register = Ncm::create([
                    'ncm_code'    => $ncm_code,
                    'ex'          => $ex ?: null,
                    'description' => $descricaoLimpa,
                    'parent_id'   => $parent_id,
                    'NT'          => $nt,
                    'aliquot'     => $aliquot_val,
                ]);

                $stack[$level] = $register;
            }

            fclose($handle);
        }
    }
}
