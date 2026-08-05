# Configuração Permanente do Android SDK no Windows

## Solução para o erro "Failed to resolve the Android SDK path"

Este erro ocorre porque as variáveis de ambiente `ANDROID_HOME` e `ANDROID_SDK_ROOT` não estão configuradas corretamente no seu sistema Windows.

## Método 1: Configuração via Interface Gráfica (Recomendado)

### Para Windows 10/11:

1. **Abra as Configurações do Sistema:**
   - Pressione `Win + X` e selecione "Sistema"
   - Clique em "Sobre" e depois em "Configurações avançadas do sistema"

2. **Variáveis de Ambiente:**
   - Clique no botão "Variáveis de Ambiente"
   - Em "Variáveis de usuário" (para seu usuário apenas) ou "Variáveis do sistema" (para todos os usuários):

3. **Adicionar NOVAS variáveis:**
   - Clique em "Novo..."
   - Nome da variável: `ANDROID_HOME`
   - Valor da variável: `C:\Users\25886\AppData\Local\Android\Sdk`
   - Clique em OK

   - Clique em "Novo..." novamente
   - Nome da variável: `ANDROID_SDK_ROOT`
   - Valor da variável: `C:\Users\25886\AppData\Local\Android\Sdk`
   - Clique em OK

4. **Editar variável PATH:**
   - Encontre a variável `Path` em "Variáveis de usuário"
   - Clique em "Editar..."
   - Clique em "Novo" e adicione: `%ANDROID_HOME%\platform-tools`
   - Clique em "Novo" e adicione: `%ANDROID_HOME%\emulator`
   - Clique em "Novo" e adicione: `%ANDROID_HOME%\tools`
   - Clique em OK em todas as janelas

5. **Reinicie o terminal/computador** para as alterações terem efeito

## Método 2: Configuração via PowerShell (Permanente)

Execute o seguinte comando no PowerShell como Administrador:

```powershell
# Define para o usuário atual
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\25886\AppData\Local\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\Users\25886\AppData\Local\Android\Sdk", "User")

# Adiciona ao PATH do usuário
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$androidPath = "C:\Users\25886\AppData\Local\Android\Sdk\platform-tools;C:\Users\25886\AppData\Local\Android\Sdk\emulator;C:\Users\25886\AppData\Local\Android\Sdk\tools"
[Environment]::SetEnvironmentVariable("Path", "$currentPath;$androidPath", "User")
```

## Método 3: Configuração via CMD (Permanente)

Execute o seguinte comando no CMD como Administrador:

```cmd
setx ANDROID_HOME "C:\Users\25886\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "C:\Users\25886\AppData\Local\Android\Sdk"
setx PATH "%PATH%;C:\Users\25886\AppData\Local\Android\Sdk\platform-tools;C:\Users\25886\AppData\Local\Android\Sdk\emulator;C:\Users\25886\AppData\Local\Android\Sdk\tools"
```

## Verificação

Após configurar, reinicie seu terminal e verifique:

```powershell
# No PowerShell
echo $env:ANDROID_HOME
echo $env:ANDROID_SDK_ROOT
```

```cmd
# No CMD
echo %ANDROID_HOME%
echo %ANDROID_SDK_ROOT%
```

## Solução Temporária (Cada Sessão)

Se você não quiser configurar permanentemente, pode usar os scripts fornecidos:

```powershell
# PowerShell
.\start.ps1
```

```cmd
# CMD
start.bat
```

Ou definir manualmente cada vez:

```powershell
$env:ANDROID_HOME = "C:\Users\25886\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\25886\AppData\Local\Android\Sdk"
npx expo start
```

## Problemas Comuns

### Caminho do Android SDK diferente
Se seu Android SDK estiver em outro local, substitua o caminho nos comandos acima pelo caminho correto.

### Android Studio não instalado
Se você não tem o Android Studio instalado, instale-o do site oficial: https://developer.android.com/studio

### Permissões
Alguns comandos requerem privilégios de administrador. Execute o PowerShell/CMD como Administrador.

## Após Configuração

Depois de configurar as variáveis de ambiente permanentemente, você pode iniciar o projeto normalmente:

```bash
npm start
```

ou

```bash
npx expo start
```

Sem erros de "Failed to resolve the Android SDK path".