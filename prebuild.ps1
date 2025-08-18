# prebuild.ps1
Write-Host "Fixing Vite permissions..."
icacls "node_modules\.bin\vite" /grant Everyone:F
icacls "node_modules\vite\bin\vite.js" /grant Everyone:F