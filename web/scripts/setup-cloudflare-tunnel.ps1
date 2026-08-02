# Cloudflare Tunnel fallback for when the phone hotspot blocks LAN traffic
# (AP / client isolation). Installs cloudflared if missing, then starts a
# quick tunnel that proxies the local Next.js dev server (and its /api proxy).
# Run via: powershell -ExecutionPolicy Bypass -File scripts/setup-cloudflare-tunnel.ps1
# or:     bun run tunnel

param([int]$Port = 3000)

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " CLOUDFLARE TUNNEL AP ISOLATION FALLBACK" -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Cyan

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue

if (-not $cloudflared) {
    Write-Host "[+] cloudflared not found in PATH. Installing via winget..." -ForegroundColor Cyan
    try {
        winget install --id Cloudflare.cloudflared -e --accept-package-agreements --accept-source-agreements | Out-Host
        $cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
    } catch {
        Write-Host "[!] winget install failed. Download cloudflared.exe from:" -ForegroundColor Red
        Write-Host "    https://github.com/cloudflare/cloudflared/releases/latest" -ForegroundColor White
        Write-Host "    and place it on your PATH, then re-run this script." -ForegroundColor White
        exit 1
    }
}

if (-not $cloudflared) {
    Write-Host "[!] cloudflared still not found. Restart this terminal (PATH refresh) and re-run." -ForegroundColor Red
    exit 1
}

Write-Host "[OK] cloudflared: $($cloudflared.Source)" -ForegroundColor Green
Write-Host ""
Write-Host "Starting quick tunnel -> http://localhost:$Port" -ForegroundColor Cyan
Write-Host "The https://xxx.trycloudflare.com URL below works from any phone on any network" -ForegroundColor White
Write-Host "(bypasses hotspot isolation, Windows Firewall, and carrier NAT). /api is proxied too." -ForegroundColor White
Write-Host "Press Ctrl+C to stop the tunnel." -ForegroundColor Gray
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host ""

& $cloudflared.Source tunnel --url "http://localhost:$Port" --no-autoupdate
