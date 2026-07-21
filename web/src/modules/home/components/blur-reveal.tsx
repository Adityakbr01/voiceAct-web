import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type MotionProps = ComponentPropsWithoutRef<typeof motion.div>;

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
  once?: boolean;
  as?: ElementType;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 14,
  amount = 0.4,
  once = true,
  as: Component = "div",
}: BlurRevealProps) {
  const MotionComponent = motion(Component) as typeof motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </MotionComponent>
  );
}
