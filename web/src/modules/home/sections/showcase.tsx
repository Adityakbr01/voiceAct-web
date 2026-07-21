import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function Showcase() {
  return (
    <section id="showcase" className="relative">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Product preview
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Interfaces engineered
              <br />
              <span className="text-5xl font-bold italic tracking-tight text-primary md:text-[6rem] md:leading-none">
                for real users.
              </span>
            </h2>
          </div>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80"
          alt="Dashboard interface designed and built by voiceAct.in"
          className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
          draggable={false}
          loading="lazy"
          decoding="async"
          width={2400}
          height={1600}
        />
      </ContainerScroll>
    </section>
  );
}
