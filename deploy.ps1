<#
.SYNOPSIS
  Regra de atualizacao do Daily Comfort Journal (presell Balmorex).
  Faz commit + push no GitHub e exibe os comandos SSH para rodar no servidor.

.DESCRIPTION
  O site em https://dailycomfort.starnixon.com/ e um clone git no document root
  do cPanel. Este script publica as mudancas locais no GitHub e depois mostra os
  comandos que VOCE deve colar manualmente no terminal SSH do cPanel para puxar a
  atualizacao no servidor.

.EXAMPLE
  ./deploy.ps1 -Message "Atualiza link dos CTAs para a oferta oficial"
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$Message
)

$ErrorActionPreference = "Stop"

Write-Host "==> 1/3  git add -A" -ForegroundColor Cyan
git add -A

Write-Host "==> 2/3  git commit" -ForegroundColor Cyan
git commit -m $Message

Write-Host "==> 3/3  git push origin main" -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host " PUSH CONCLUIDO. Agora rode no terminal SSH do cPanel:" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "cd ~/dailycomfort.starnixon.com && git pull" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
