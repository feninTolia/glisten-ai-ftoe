import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

export type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose prose-invert prose-lg prose-slate">
        <PrismicRichText field={slice.primary.body} />
      </div>
    </Bounded>
  );
};

export default RichText;
