import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import StarBackground from './StarBackground';
import Image from 'next/image';
import background from './background.jpg';
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from 'react-icons/fa';
import StylizedLogoMark from './StylizedLogoMark';
import { Fragment } from 'react';
import { clsx } from 'clsx';

export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  const icons = {
    digitalocean: <FaDigitalOcean />,
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt="background"
        fill
        className=" object-cover"
        quality={90}
      />

      <StarBackground />

      <div className="relative">
        <h2 className="text-5xl mx-auto max-w-2xl text-balance text-center font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <p className="text-slate-300 mx-auto mt-6 max-w-md text-center text-balance">
          <PrismicText field={slice.primary.body} />
        </p>
      </div>

      <div className="mt-20 flex flex-col items-center md:flex-row">
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
    </Bounded>
  );
};

export default Integrations;
