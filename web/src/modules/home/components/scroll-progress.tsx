import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background:
          "linear-gradient(90deg, var(--color-secondary), var(--color-primary), var(--color-primary-glow))",
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    />
  );
}
