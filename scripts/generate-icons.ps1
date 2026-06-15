# Generates favicon / app icons from public/bee-mark.png
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root "public\bee-mark.png"
$appDir = Join-Path $root "app"
$publicDir = Join-Path $root "public"

if (-not (Test-Path $sourcePath)) {
  Write-Error "Missing $sourcePath"
}

$src = [System.Drawing.Image]::FromFile($sourcePath)
$crop = [Math]::Min($src.Width, $src.Height)

function Save-Icon {
  param([int]$Size, [string]$OutPath)
  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::FromArgb(255, 254, 226, 176)) # honey-300 #FEE2B0
  $srcRect = New-Object System.Drawing.Rectangle 0, 0, $crop, $crop
  $padding = [int]($Size * 0.08)
  $inner = $Size - (2 * $padding)
  $destRect = New-Object System.Drawing.Rectangle $padding, $padding, $inner, $inner
  $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $dir = Split-Path -Parent $OutPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Wrote $OutPath"
}

Save-Icon -Size 32 -OutPath (Join-Path $appDir "icon.png")
Save-Icon -Size 180 -OutPath (Join-Path $appDir "apple-icon.png")
Save-Icon -Size 192 -OutPath (Join-Path $publicDir "icon-192.png")

$src.Dispose()
Write-Host "Done."
