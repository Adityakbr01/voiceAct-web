import os from "os";
import { spawn } from "child_process";

const WEB_PORT = 3000;
const API_PORT = 5000;

interface NetIf {
  name: string;
  address: string;
  isVirtual: boolean;
}

function isVirtualName(name: string): boolean {
  return /vEthernet|WSL|Virtual|Loopback|Hyper-V|Docker|Bluetooth|Local Area Connection/i.test(
    name,
  );
}

function getLanAddresses(): NetIf[] {
  const list: NetIf[] = [];
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === "IPv4" && !net.internal && !net.address.startsWith("169.254")) {
        list.push({ name, address: net.address, isVirtual: isVirtualName(name) });
      }
    }
  }
  return list;
}

// The address the phone can actually reach: a real (non-virtual) adapter.
function getPhoneAddress(list: NetIf[]): NetIf | undefined {
  return list.find((i) => !i.isVirtual) ?? list[0];
}

function printHeader(phone: NetIf | undefined, lanIps: NetIf[]) {
  console.log("\n==========================================================================");
  console.log(" 🚀 NEXT.JS LAN DEV SERVER (Bun + Turbopack)");
  console.log("==========================================================================");
  console.log(" 💻 Localhost URL:      http://localhost:3000");
  console.log(" ⚡ Listening Address:  0.0.0.0:3000");
  if (phone) {
    console.log(` 📱 Phone / LAN URL:    http://${phone.address}:${WEB_PORT}`);
    console.log(` 🔌 API URL (proxied):  /api  ->  http://localhost:${API_PORT}/api`);
  } else {
    console.log(" ⚠️  No external LAN IPv4 address detected!");
  }
  console.log("--------------------------------------------------------------------------");
  for (const item of lanIps) {
    console.log(
      `   - ${item.name}${item.isVirtual ? " (virtual, ignored)" : ""}: http://${item.address}:${WEB_PORT}`,
    );
  }
  console.log("--------------------------------------------------------------------------");
  console.log(" 🌐 Cloudflare Tunnel fallback (if the phone still can't reach the LAN IP):");
  console.log("    Run in a separate terminal: bun run tunnel");
  console.log("    -> prints a public https://xxx.trycloudflare.com URL that also proxies /api");
  console.log("==========================================================================\n");
}

async function waitForServer(url: string, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.status < 500) return true; // any non-5xx means the server is up
    } catch {
      // still booting
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function verifyLan(phone: NetIf | undefined) {
  if (!phone) return;
  const url = `http://${phone.address}:${WEB_PORT}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    console.log(` [✓] LAN check ${url} -> HTTP ${res.status}`);
  } catch {
    console.log(` [✗] LAN check ${url} failed.`);
    console.log(
      "     If the phone still can't load it, your hotspot blocks client traffic (AP/client",
    );
    console.log("     isolation) -> use the Cloudflare Tunnel fallback: bun run tunnel");
  }
}

async function startDevServer() {
  const lanIps = getLanAddresses();
  const phone = getPhoneAddress(lanIps);
  printHeader(phone, lanIps);

  const nextProcess = spawn("bun", ["x", "next", "dev", "-H", "0.0.0.0", "--turbo"], {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  const ready = await waitForServer(`http://127.0.0.1:${WEB_PORT}`, 90_000);
  if (ready) {
    console.log(` [✓] Dev server is up and responding on port ${WEB_PORT}.`);
    await verifyLan(phone);
  } else {
    console.log(" [✗] Timed out waiting for the dev server to start.");
  }

  nextProcess.on("error", (err) => {
    console.error("Failed to start Next.js dev server:", err);
  });

  nextProcess.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

startDevServer();
