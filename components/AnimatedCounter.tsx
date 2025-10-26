import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, duration = 1.5 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          // Check if 'to' is an integer to decide formatting, otherwise format to 2 decimal places
          if (Number.isInteger(to) && value % 1 === 0) {
             node.textContent = value.toFixed(0);
          } else {
             node.textContent = value.toFixed(2);
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  // Set initial text content to avoid flash of empty content
  useEffect(() => {
      if (nodeRef.current && !isInView) {
          nodeRef.current.textContent = String(from);
      }
  }, [from, isInView]);

  return <span ref={nodeRef} />;
};
