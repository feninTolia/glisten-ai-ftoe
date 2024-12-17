import Bounded from '@/components/Bounded';
import { createClient } from '@/prismicio';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import clsx from 'clsx';

export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();

  const caseStudies = await Promise.all(
    slice.primary.cases.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id
        );
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="text-5xl max-w-2xl text-balance text-center font-medium md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <p className="text-slate-300 mx-auto mt-6 max-w-md text-center text-balance">
        <PrismicText field={slice.primary.body} />
      </p>

      <div className="mt-20 grid gap-16">
        {caseStudies.map(
          (caseStudy, idx) =>
            caseStudy && (
              <div
                key={caseStudy.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="flex flex-col justify-center gap-4 col-span-1">
                  <h3 className="text-4xl">
                    <PrismicText field={caseStudy.data.company} />
                  </h3>
                  <div className="max-w-4xl">
                    <PrismicRichText field={caseStudy.data.description} />
                  </div>

                  <PrismicNextLink
                    document={caseStudy}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    Read <PrismicText field={caseStudy.data.company} /> case
                    study
                  </PrismicNextLink>
                </div>

                <PrismicNextImage
                  field={caseStudy.data.logo_image}
                  quality={100}
                  className={clsx(
                    'rounded-xl lg:col-span-2',
                    idx % 2 && 'md:-order-1'
                  )}
                />
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
