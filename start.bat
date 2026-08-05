@echo off
REM Script para configurar variáveis de ambiente e iniciar o Expo
REM Define ANDROID_HOME e ANDROID_SDK_ROOT para o seu usuário

set ANDROID_HOME=C:\Users\25886\AppData\Local\Android\Sdk
set ANDROID_SDK_ROOT=C:\Users\25886\AppData\Local\Android\Sdk

echo Configurando variáveis de ambiente:
echo ANDROID_HOME=%ANDROID_HOME%
echo ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
echo.

echo Iniciando Expo...
npx expo start