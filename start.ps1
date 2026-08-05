# Script PowerShell para configurar variáveis de ambiente e iniciar o Expo
# Define ANDROID_HOME e ANDROID_SDK_ROOT para o seu usuário

$env:ANDROID_HOME = "C:\Users\25886\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\25886\AppData\Local\Android\Sdk"

Write-Host "Configurando variáveis de ambiente:"
Write-Host "ANDROID_HOME=$env:ANDROID_HOME"
Write-Host "ANDROID_SDK_ROOT=$env:ANDROID_SDK_ROOT"
Write-Host ""

Write-Host "Iniciando Expo..."
npx expo start