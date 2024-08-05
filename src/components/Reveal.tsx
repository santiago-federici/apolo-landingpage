import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className,
  delay,
}: {
  children: JSX.Element;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        initial: {
          opacity: 0,
          y: 75,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            delay: delay || 0,
          },
        },
      }}
      initial="initial"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
