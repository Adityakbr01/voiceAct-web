import geoip from "geoip-lite";

export function lookupCountry(ip: string): { country?: string; city?: string } {
  if (!ip || ip === "unknown" || ip.startsWith("::") || ip === "127.0.0.1") {
    return {};
  }
  const result = geoip.lookup(ip);
  if (!result) return {};
  return { country: result.country, city: result.city ?? undefined };
}
