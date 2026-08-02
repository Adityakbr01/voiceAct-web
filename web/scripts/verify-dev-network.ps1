# Verification and Diagnostic Script for Next.js Development Network Setup
# Run via: powershell -ExecutionPolicy Bypass -File scripts/verify-dev-network.ps1

$ErrorActionPreference = "Continue"
$failed = $false

function Test-TcpPort {
    param([string]$HostName, [int]$Port, [int]$TimeoutMs = 1500)
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $ar = $client.BeginConnect($HostName, $Port, $null, $null)
        if (-not $ar.AsyncWaitHandle.WaitOne($TimeoutMs)) { return $false }
        $client.EndConnect($ar)
        return $true
    } catch {
        return $false
    } finally {
        $client.Dispose()
    }
}

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host " NEXT.JS DEV NETWORK VERIFICATION AND DIAGNOSTIC SUITE" -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Cyan

# 1. Detect IPv4 Network Interfaces
Write-Host ""
Write-Host "1. Inspecting Network Interfaces and IP Addresses..." -ForegroundColor Yellow
$ifaces = Get-NetIPConfiguration -ErrorAction SilentlyContinue | Where-Object { $_.NetAdapter.Status -eq "Up" -and $_.IPv4Address }
$allIps = @()
foreach ($i in $ifaces) {
    foreach ($addr in $i.IPv4Address) {
        if ($addr.IPAddress -ne "127.0.0.1" -and $addr.IPAddress -notlike "169.254.*") {
            Write-Host "   [+] Interface: $($i.InterfaceAlias) | IP: $($addr.IPAddress)" -ForegroundColor Green
            $allIps += $addr.IPAddress
        }
    }
}
if (-not $allIps) { Write-Host "   [!] Warning: No non-loopback IPv4 network interface found." -ForegroundColor Red; $failed = $true }

# Phone-reachable primary IP: a real adapter (not vEthernet/WSL) with a gateway
$primaryIp = Get-NetIPConfiguration -ErrorAction SilentlyContinue |
    Where-Object { $_.NetAdapter.Status -eq "Up" -and $_.IPv4DefaultGateway -and $_.IPv4Address } |
    Where-Object { $_.InterfaceAlias -notmatch "vEthernet|WSL|Virtual|Loopback|Hyper-V|Docker|Bluetooth|Local Area Connection" } |
    ForEach-Object { ($_.IPv4Address | Sort-Object PrefixLength | Select-Object -First 1).IPAddress } |
    Where-Object { $_ -and $_ -notlike "169.254.*" } |
    Select-Object -First 1
if (-not $primaryIp) { $primaryIp = $allIps | Select-Object -First 1 }
Write-Host ""
Write-Host "   Primary LAN IP (phone should use this): $primaryIp" -ForegroundColor Cyan

# 2. Check Windows Firewall Status for Dev Ports
Write-Host ""
Write-Host "2. Inspecting Windows Firewall Rules for Port 3000 / 5000..." -ForegroundColor Yellow
$fwRules = Get-NetFirewallRule -DisplayName "*Next.js*","*VoiceAct Dev*" -ErrorAction SilentlyContinue
if ($fwRules) {
    foreach ($r in $fwRules) {
        Write-Host "   [OK] Found Rule: '$($r.DisplayName)' | Enabled: $($r.Enabled) | Action: $($r.Action)" -ForegroundColor Green
    }
} else {
    Write-Host "   [!] Warning: No dev firewall rule found! Run scripts\setup-dev-network.ps1 as Administrator." -ForegroundColor Red
    $failed = $true
}

# 3. Check Local Socket Listeners
Write-Host ""
Write-Host "3. Checking Server Listening Sockets..." -ForegroundColor Yellow
$webListen = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
$apiListen = Get-NetTCPConnection -LocalPort 5000 -State Listen -ErrorAction SilentlyContinue
if ($webListen) {
    foreach ($c in $webListen) { Write-Host "   [OK] Web server listening on $($c.LocalAddress):$($c.LocalPort) (PID $($c.OwningProcess))" -ForegroundColor Green }
} else {
    Write-Host "   [i] Web dev server not running on port 3000. Start it with: bun run dev" -ForegroundColor Cyan
}
if ($apiListen) {
    foreach ($c in $apiListen) { Write-Host "   [OK] API server listening on $($c.LocalAddress):$($c.LocalPort) (PID $($c.OwningProcess))" -ForegroundColor Green }
} else {
    Write-Host "   [i] API server not running on port 5000. Start it with: (in server/) bun run dev" -ForegroundColor Cyan
}

# 4. LAN HTTP Connectivity Self-Test
Write-Host ""
Write-Host "4. Performing HTTP Connectivity Self-Test..." -ForegroundColor Yellow
$urls = @()
if ($webListen) {
    $urls += @{ Label = "Localhost web"; Url = "http://localhost:3000" }
    $urls += @{ Label = "LAN web (phone)"; Url = "http://${primaryIp}:3000" }
}
if ($apiListen) {
    $urls += @{ Label = "Localhost API"; Url = "http://localhost:5000/api/health" }
    $urls += @{ Label = "LAN API (phone)"; Url = "http://${primaryIp}:5000/api/health" }
}
foreach ($u in $urls) {
    $uri = [uri]$u.Url
    $ok = Test-TcpPort -HostName $uri.Host -Port $uri.Port
    if (-not $ok) { $failed = $true }
    Write-Host ("   {0} {1}  ->  {2}" -f $u.Label.PadRight(20), $u.Url, $(if ($ok) { "[OK]" } else { "[FAIL]" }))
}
if (-not $urls) { Write-Host "   [i] Nothing to test yet - start the dev servers first." -ForegroundColor Gray }

# 5. Android Hotspot / Client Isolation Diagnosis
Write-Host ""
Write-Host "5. Android Mobile Hotspot / Client Isolation Check:" -ForegroundColor Yellow
Write-Host "   ------------------------------------------------------------------------" -ForegroundColor Gray
Write-Host "   - If every check above is [OK] but the phone still can't load" -ForegroundColor White
Write-Host "     http://${primaryIp}:3000, your hotspot is blocking client traffic" -ForegroundColor White
Write-Host "     (AP / client isolation). This is enforced by the phone's kernel, so it" -ForegroundColor White
Write-Host "     cannot be fixed from Windows. Try: turn OFF 'AP isolation' / 'Maximize" -ForegroundColor White
Write-Host "     compatibility' in the hotspot settings, or use a different tethering mode." -ForegroundColor White
Write-Host "   - Automatic Fallback: use the Cloudflare Tunnel, which bypasses hotspot" -ForegroundColor White
Write-Host "     isolation, firewall blocks, and carrier NAT entirely:" -ForegroundColor White
Write-Host "       Run:  bun run tunnel" -ForegroundColor Green
Write-Host "       -> gives https://xxx.trycloudflare.com (works on any network, also proxies /api)" -ForegroundColor White
Write-Host "   ------------------------------------------------------------------------" -ForegroundColor Gray

Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Cyan
if ($failed) {
    Write-Host " Result: SOME CHECKS FAILED - see messages above." -ForegroundColor Red
    Write-Host " Fix in order: 1) start servers, 2) run setup-dev-network.ps1 (admin) once." -ForegroundColor White
} else {
    Write-Host " Result: ALL CHECKS PASSED." -ForegroundColor Green
    Write-Host " Open on your phone: http://${primaryIp}:3000" -ForegroundColor White
}
Write-Host "==========================================================================" -ForegroundColor Cyan
exit $(if ($failed) { 1 } else { 0 })
