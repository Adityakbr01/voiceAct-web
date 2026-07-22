// ponytail: regex-based UA parser, good enough for MVP. Replace with ua-parser-js if accuracy matters.

interface ParsedUA {
  device: string;
  browser: string;
  os: string;
}

const BROWSERS: [RegExp, string][] = [
  [/edg/i, "Edge"],
  [/opr|opera/i, "Opera"],
  [/chrome/i, "Chrome"],
  [/firefox/i, "Firefox"],
  [/safari/i, "Safari"],
  [/msie|trident/i, "IE"],
];

const OS: [RegExp, string][] = [
  [/windows/i, "Windows"],
  [/macintosh|mac os/i, "MacOS"],
  [/linux/i, "Linux"],
  [/android/i, "Android"],
  [/iphone|ipad|ipod/i, "iOS"],
];

const DEVICES: [RegExp, string][] = [
  [/mobile|android|iphone|ipod/i, "Mobile"],
  [/ipad|tablet/i, "Tablet"],
];

export function parseUA(ua: string | undefined): ParsedUA {
  if (!ua) return { device: "Unknown", browser: "Unknown", os: "Unknown" };

  const browser = BROWSERS.find(([re]) => re.test(ua))?.[1] ?? "Other";
  const os = OS.find(([re]) => re.test(ua))?.[1] ?? "Other";
  const device = DEVICES.find(([re]) => re.test(ua))?.[1] ?? "Desktop";

  return { device, browser, os };
}
