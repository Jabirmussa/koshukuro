@echo off
REM Script para configurar variáveis de ambiente e iniciar o Expo
REM Define ANDROID_HOME e ANDROID_SDK_ROOT para o seu usuário

set ANDROID_HOME=C:\Users\25886\AppData\Local\Android\Sdk
set ANDROID_SDK_ROOT=C:\Users\25886\AppData\Local\Android\Sdk

echo Configurando variáveis de ambiente:
echo ANDROID_HOME=%ANDROID_HOME%
echo ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
echo.

REM Verifica se o Android SDK existe
if not exist "%ANDROID_HOME%" (
    echo ERRO: Android SDK não encontrado em %ANDROID_HOME%
    echo Por favor, instale o Android SDK ou atualize o caminho neste script.
    pause
    exit /b 1
)

echo Iniciando Expo...
npx expo start