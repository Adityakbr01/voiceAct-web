import { site, nav } from "@/modules/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-16 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-xl font-semibold">{site.name}</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {site.tagline}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {site.location}
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Company
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 block text-lg font-display font-medium italic text-primary transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="glass rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}