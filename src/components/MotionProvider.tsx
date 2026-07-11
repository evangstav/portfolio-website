'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

// LazyMotion + m.* components load only the DOM-animation feature set
// (~25-30 KB gzip smaller per page than the full `motion` import); `strict`
// throws in dev if a full `motion.*` component sneaks back in.
// MotionConfig honors the user's prefers-reduced-motion setting.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
