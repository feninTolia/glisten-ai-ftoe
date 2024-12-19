'use client';

import { useGSAP } from '@gsap/react';
import { Content } from '@prismicio/client';
import clsx from 'clsx';
import gsap from 'gsap';
import { Fragment, useRef } from 'react';
import {
  FaCloudflare,
  FaDigitalOcean,
  FaFigma,
  FaFly,
  FaGithub,
  FaNpm,
} from 'react-icons/fa';
import StylizedLogoMark from './StylizedLogoMark';

const icons = {
  digitalocean: <FaDigitalOcean />,
  cloudflare: <FaCloudflare />,
  npm: <FaNpm />,
  github: <FaGithub />,
  figma: <FaFigma />,
  fly: <FaFly />,
};

gsap.registerPlugin(useGSAP);

type Props = { slice: Content.IntegrationsSlice };

const AnimatedContent = ({ slice }: Props) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut' },
      });

      tl.to('.pulsing-logo', {
        keyframes: [
          {
            filter: 'brightness(2)',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
          },
          { filter: 'brightness(1)', opacity: 0.7, duration: 0.9 },
        ],
      });

      tl.to(
        '.signal-line',
        {
          keyframes: [
            { backgroundPosition: '0% 0%' },
            {
              backgroundPosition: '100% 100%',
              stagger: { from: 'center', each: 0.3 },
              duration: 1,
            },
          ],
        },
        '-=1.4'
      );

      tl.to(
        '.pulsing-icon',
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: 'center',
                each: 0.3,
              },
            },
          ],
        },
        '-=2'
      );
    },
    { scope: container }
  );

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {slice.primary.icons.map((icon, idx) => (
        <Fragment key={icon.item}>
          {idx === Math.floor(slice.primary.icons.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t"></div>
            </>
          )}

          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {icon.item && icons[icon.item]}
          </div>
          {idx !== slice.primary.icons.length - 1 && (
            <div
              className={clsx(
                'signal-line',
                idx >= Math.floor(slice.primary.icons.length / 2)
                  ? 'rotate-180'
                  : 'rotate-0'
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AnimatedContent;
