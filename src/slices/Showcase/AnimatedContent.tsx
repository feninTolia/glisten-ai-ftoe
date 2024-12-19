'use client';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ReactNode, useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { children: ReactNode };

const AnimatedContent = ({ children }: Props) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }

      gsap.fromTo(
        container.current,
        { y: 100 },
        {
          y: 0,
          ease: 'power2.inOut',
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            // markers: true,
            // start: 'top bottom-=20%',
            // end: 'top top+=30%',
            // scrub: true,
            start: 'top bottom-=40%',
            toggleActions: 'play pause resume reverse',
          },
        }
      );
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
};

export default AnimatedContent;
