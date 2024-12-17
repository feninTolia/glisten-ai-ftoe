'use client';
import ButtonLink from '@/components/ButtonLink';
import WordMark from '@/components/WordMark';
import { asLink, Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

type Props = { settings: Content.SettingsDocument };

const NavBar = ({ settings }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Navbar" className="px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl flex flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>

          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={clsx(
            'gap-4 fixed inset-0 flex flex-col z-40 items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
            isOpen ? 'translate-x-0' : 'translate-x-[100%]'
          )}
        >
          <button
            type="button"
            className="block p-2 text-3xl text-white fixed right-4 top-6 mb-4 "
            aria-expanded={isOpen}
            onClick={() => setIsOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>
          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => (
              <li key={item.label} className=" list-none">
                {item.cta_button ? (
                  <ButtonLink
                    field={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                ) : (
                  <PrismicNextLink
                    className="block px-3 text-3xl first:mt-8"
                    field={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.label}
                  </PrismicNextLink>
                )}
              </li>
            ))}
          </div>
        </div>
        {/* Desktop nav */}
        <ul className="hidden  md:flex gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              {item.cta_button ? (
                <ButtonLink
                  field={item.link}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? 'page'
                      : undefined
                  }
                >
                  {item.label}
                </ButtonLink>
              ) : (
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item.link}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? 'page'
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
