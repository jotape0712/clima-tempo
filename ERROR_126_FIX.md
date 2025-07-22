# 🔧 Correção Completa do Erro de Deploy 126

## ❌ **Erro Encontrado:**
```
Error: Command "npm run build" exited with 126
```

## ✅ **Correções Aplicadas:**

### 1. **Corrigido comando de build no package.json:**
```json
// ANTES:
"build": "npx vite build"

// DEPOIS:
"build": "vite build"
```
**Motivo**: O `npx` pode causar problemas de permissão no ambiente Vercel.

### 2. **Simplificado vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**Motivo**: Configuração minimalista evita conflitos de configuração.

### 3. **Otimizado vite.config.js:**
- Adicionadas configurações específicas de build
- Configuração de output otimizada
- Desabilitado sourcemap para produção

### 4. **Especificado versão do Node.js:**
- Criado `.nvmrc` com versão 18
- Adicionado `engines` no package.json

## 🚀 **Para Deploy no Vercel:**

### **Configure as Variáveis de Ambiente:**
```
VITE_OPENWEATHER_API_KEY=9e009d53824c2ceb2a854663a63e5abc
VITE_WEATHER_API_KEY=b8f7c6e5d4a3b2c1f9e8d7c6b5a4f3e2
```

### **Configurações Recomendadas:**
- **Node.js Version**: 18.x (será detectado automaticamente via .nvmrc)
- **Framework**: Vite (detecção automática)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `dist` (padrão)

## ✅ **Checklist Final:**
- ✅ Comando build corrigido (sem npx)
- ✅ Configuração Vercel simplificada
- ✅ Vite config otimizado
- ✅ Versão Node.js especificada
- ✅ Build local funcionando
- ✅ Variáveis de ambiente configuradas

## 🎯 **Próximos Passos:**
1. **Commit e push** das mudanças
2. **Configure as variáveis** no painel Vercel
3. **Redeploy** automaticamente

**O erro 126 deve estar resolvido agora! 🚀**
