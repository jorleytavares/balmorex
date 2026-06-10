# Regra de Atualização (Deploy)

Site em produção: **https://dailycomfort.starnixon.com/**
Repositório: **https://github.com/jorleytavares/balmorex** (branch `main`)
Hospedagem: cPanel (DNSPro, servidor `pro126`, usuário `curr6441`)
Document root: `~/dailycomfort.starnixon.com/`

O document root **é um clone git**. Portanto o deploy tem dois lados:
publicar no GitHub (local) e puxar no servidor (SSH manual).

---

## Fluxo padrão de atualização

### 1. Local — publicar no GitHub

Opção A (script automático):

```powershell
./deploy.ps1 -Message "descrição da mudança"
```

Opção B (manual):

```powershell
git add -A
git commit -m "descrição da mudança"
git push origin main
```

### 2. Servidor — puxar a atualização (SSH manual no cPanel)

No terminal SSH do cPanel, cole:

```bash
cd ~/dailycomfort.starnixon.com && git pull
```

Pronto — a mudança está no ar.

---

## Observações importantes

- **Manter `.well-known/`** no document root (AutoSSL). O `git pull` não mexe nele.
- **`.htaccess`** bloqueia `/.git` e arquivos `.md` (para o `DOCUMENTATION.md` e este
  `DEPLOY.md` não ficarem públicos). Não está versionado no repositório; vive só no
  servidor. Se precisar recriar:
  ```bash
  cd ~/dailycomfort.starnixon.com
  printf '%s\n' 'RedirectMatch 404 /\.git' 'RedirectMatch 404 \.md$' >> .htaccess
  ```
- **Conflito no `git pull`**: se alguém editou arquivos direto no servidor, o pull pode
  conflitar. O servidor deve ser tratado como somente-leitura — toda edição é feita no
  local e enviada via push.
- **Primeiro deploy (histórico)**: o site foi posicionado com `git clone` dentro do
  document root e os arquivos movidos para a raiz (a pasta já continha `.well-known/`).
