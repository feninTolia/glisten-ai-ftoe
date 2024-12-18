'use client';
import ButtonLink from '@/components/ButtonLink';
import StarGrid from '@/components/StarGrid';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useGSAP } from '@gsap/react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

type Props = { slice: Content.HeroSlice };

const AnimatedContent = ({ slice }: Props) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          '.hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow',
          { opacity: 1 }
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      tl.fromTo(
        '.hero__heading',
        { scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.4 }
      );
      tl.fromTo(
        '.hero__body',
        { y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.6'
      );
      tl.fromTo(
        '.hero__button',
        { scale: 1.5 },
        { opacity: 1, scale: 1, duration: 1.3 },
        '-=0.8'
      );
      tl.fromTo(
        '.hero__image',
        { y: 100 },
        { opacity: 1, y: 0, duration: 1.3 },
        '-=0.3'
      );
      tl.fromTo(
        '.hero__glow',
        { scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.8 },
        '-=1'
      );
    },

    { scope: container }
  );
  return (
    <div className="relative" ref={container}>
      <StarGrid />
      {isFilled.richText(slice.primary.heading) && (
        <h1 className="hero__heading opacity-0 text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h1>
      )}

      {isFilled.richText(slice.primary.body) && (
        <div className="hero__body opacity-0  mx-auto mt-6 max-w-md text-balance text-slate-300 ">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}

      {isFilled.link(slice.primary.button_link) && (
        <ButtonLink
          className="hero__button opacity-0  mt-8"
          field={slice.primary.button_link}
        >
          {slice.primary.button_text}
        </ButtonLink>
      )}

      {isFilled.image(slice.primary.image) && (
        <div className="hero__image opacity-0  glass-container mt-16 w-fit">
          <div className="hero__glow opacity-0  absolute inset-0 -z-10 bg-blue-500/30 blur-2xl " />
          <PrismicNextImage
            className=" rounded-lg"
            field={slice.primary.image}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedContent;
