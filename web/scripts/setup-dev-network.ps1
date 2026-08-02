# Setup Permanent Windows 11 Development Firewall and Networking Rules
# Must be executed in PowerShell (Administrator) - self-elevates if not.
# Run: powershell -ExecutionPolicy Bypass -File scripts/setup-dev-network.ps1

# Check for Administrator elevation
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[!] Admin privileges required. Launching elevated PowerShell..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

function Ensure-FirewallRule {
    param(
        [string]$DisplayName,
        [string]$LocalPort,
        [string]$Protocol = "TCP"
    )
    $existing = Get-NetFirewallRule -DisplayName $DisplayName -ErrorAction SilentlyContinue
    if ($existing) {
        Write-Host "[OK] Updating existing firewall rule '$DisplayName'..." -ForegroundColor Green
        Set-NetFirewallRule -DisplayName $DisplayName `
            -Direction Inbound -Action Allow -Protocol $Protocol -LocalPort $LocalPort `
            -Profile Domain, Private, Public -Enabled True
    } else {
        Write-Host "[+] Creating permanent firewall rule '$DisplayName'..." -ForegroundColor Green
        New-NetFirewallRule -DisplayName $DisplayName `
            -Direction Inbound -Action Allow -Protocol $Protocol -LocalPort $LocalPort `
            -Profile Domain, Private, Public -Enabled True | Out-Null
    }
}

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " NEXT.JS DEV NETWORK ENVIRONMENT SETUP (WINDOWS 11)" -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Cyan

# 1. Next.js dev server (web) on port 3000, plus the standard alternate dev ports
Ensure-FirewallRule -DisplayName "Next.js Dev Server (Ports 3000-3005)" -LocalPort "3000-3005"

# 2. Express API dev server (server/) on port 5000
Ensure-FirewallRule -DisplayName "VoiceAct Dev API (Port 5000)" -LocalPort "5000"

# 3. Firewall Rule for ICMP Diagnostics (Ping)
$ICMPRuleName = "LAN Dev Diagnostics (ICMPv4 In)"
$ExistingICMP = Get-NetFirewallRule -DisplayName $ICMPRuleName -ErrorAction SilentlyContinue
if (-not $ExistingICMP) {
    Write-Host "[+] Enabling ICMP IPv4 Echo Request (Ping) for LAN diagnostics..." -ForegroundColor Green
    New-NetFirewallRule -DisplayName $ICMPRuleName `
        -Direction Inbound -Action Allow -Protocol ICMPv4 -IcmpType 8 `
        -Profile Domain, Private, Public -Enabled True | Out-Null
}

# 4. Detect and Configure Active Network Profiles (Public / Private)
Write-Host ""
Write-Host "[i] Active Network Connection Profiles:" -ForegroundColor Yellow
$profiles = Get-NetConnectionProfile
foreach ($p in $profiles) {
    Write-Host "  - Interface: $($p.InterfaceAlias) | Network: $($p.Name) | Category: $($p.NetworkCategory)" -ForegroundColor White
    if ($p.NetworkCategory -eq "Public") {
        Write-Host "    [!] Network is 'Public' (the default for a phone hotspot). The rules above cover" -ForegroundColor Yellow
        Write-Host "        Domain, Private AND Public, so this is fine - no profile change needed." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " [OK] PERMANENT WINDOWS FIREWALL SETUP COMPLETE!" -ForegroundColor Green
Write-Host " - Web (3000-3005) and API (5000) inbound traffic: ALLOWED on all profiles" -ForegroundColor White
Write-Host " - Diagnostic ping: ALLOWED" -ForegroundColor White
Write-Host " - Rules persist automatically across reboots (created once, no boot task needed)." -ForegroundColor White
Write-Host "==========================================================================" -ForegroundColor Cyan
