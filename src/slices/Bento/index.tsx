import Bounded from '@/components/Bounded';
import { asText, Content } from '@prismicio/client';
import {
  PrismicImage,
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import clsx from 'clsx';

export type BentoProps = SliceComponentProps<Content.BentoSlice>;

const Bento = ({ slice }: BentoProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className=" bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent not-italic">
              {children}
            </em>
          ),
        }}
      />
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto,auto,auto] gap-8 md:grid-cols-3">
        {slice.primary.bento_items.map((item) => (
          <div
            className={clsx(
              'glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4',
              item.wide ? 'md:col-span-2' : 'md:col-span-1'
            )}
            key={asText(item.title)}
          >
            <h3 className="text-2xl">
              <PrismicText field={item.title} />
            </h3>
            <div className="max-w-md text-balance text-slate-300">
              <PrismicRichText field={item.body} />
            </div>
            <PrismicImage field={item.image} className="max-h-36 w-auto " />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Bento;
