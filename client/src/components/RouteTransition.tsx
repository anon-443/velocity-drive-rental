import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

type RouteTransitionProps = {
  children: ReactNode;
};

/** Keeps page changes deliberate without delaying interaction or overwhelming reduced-motion users. */
export default function RouteTransition({ children }: RouteTransitionProps) {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const };

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={location}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
        transition={transition}
        className="route-stage"
      >
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="route-progress"
            initial={{ opacity: 0.9, scaleX: 0.08 }}
            animate={{ opacity: 0, scaleX: 1 }}
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
