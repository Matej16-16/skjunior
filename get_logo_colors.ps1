Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap((Resolve-Path 'SK_Junior_logo.jpg').Path)
$colors = @{}
for ($x = 0; $x -lt $bmp.Width; $x += 3) {
    for ($y = 0; $y -lt $bmp.Height; $y += 3) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 100) {
            # bucket colors
            $r = [Math]::Round($p.R / 16) * 16
            $g = [Math]::Round($p.G / 16) * 16
            $b = [Math]::Round($p.B / 16) * 16
            $hex = ('#{0:X2}{1:X2}{2:X2}' -f [Math]::Min(255,$r), [Math]::Min(255,$g), [Math]::Min(255,$b))
            $colors[$hex]++
        }
    }
}
$bmp.Dispose()
$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 25 | ForEach-Object {
    Write-Output "$($_.Name): $($_.Value)"
}
