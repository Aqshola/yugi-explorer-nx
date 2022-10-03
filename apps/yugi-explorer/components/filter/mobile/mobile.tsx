import { useEffect, useState } from 'react';
import NextLink from 'next/link';


/* eslint-disable-next-line */
export interface MobileProps {
  onChangeCallback(e: any): void;
  inputValue: string;
  type?: 'main' | 'deck';
}

export function Mobile(props: MobileProps) {
  const [showFilter, setshowFilter] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);

  function handleScroll() {
    if (window.scrollY > 300) {
      setSticky(true);
    } else {
      setSticky(false);
    }

  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  });

  return (
    <div
      className={
        'md:hidden transition-all sticky top-0 py-5 px-5 md:px-14' + (sticky ? ' backdrop-blur-lg z-50 bg-blue-primary/70' : ' ')
      }
    >
      <div className="flex md:hidden justify-between items-center">
        <button
          aria-label="Filter"
          className="flex gap-5"
          onClick={() => setshowFilter(!showFilter)}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            className={
              'transition-all  ' +
              (showFilter ? 'fill-yellow-primary' : ' fill-white')
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L10.3967 10.3967V30L19.6033 22.4671V10.3967L30 0H0Z"
              fill="current"
            />
          </svg>
          <span className="text-white text-lg font-grenze">Filter</span>
        </button>

        <div className="ml-auto md:hidden block">
          <NextLink
            href={props.type == 'main' ? '/deck' : '/'}
            passHref
            scroll={false}
          >
            <a className="flex  bg-yellow-primary rounded-lg items-center py-2 px-3">
              <span className="font-grenze text-xl">
                {props.type === 'main' ? 'My Deck' : 'Explorer'}
              </span>
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.25 2.5H8.75C7.375 2.5 6.25 3.625 6.25 5V25C6.25 26.375 7.375 27.5 8.75 27.5H21.25C22.625 27.5 23.75 26.375 23.75 25V5C23.75 3.625 22.625 2.5 21.25 2.5ZM15 21.25L11.25 15L15 8.75L18.75 15L15 21.25Z"
                    fill="black"
                  />
                </svg>
              </span>
            </a>
          </NextLink>
        </div>
      </div>

      <div
        data-testid='box-search'
        className={
          ' transition-all block md:hidden bg-blue-light py-5 px-5 mt-5 rounded space-y-5 ' +
          (showFilter
            ? ' h-32 opacity-100 py-5 visible'
            : ' invisible opacity-0 h-0 py-0')
        }
      >
        <div>
          <label htmlFor="search-mobile" className="text-2xl text-white font-grenze">
            Search Card
          </label>
          <div className="bg-blue-dark rounded-3xl flex p-3 mt-2 w-full items-center gap-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875ZM12.178 7.176C11.8831 7.3092 11.625 7.51195 11.4257 7.76686C11.2264 8.02176 11.0919 8.32121 11.0338 8.63951C10.9757 8.95781 10.9957 9.28546 11.0921 9.59433C11.1885 9.90321 11.3583 10.1841 11.5871 10.4129C11.8159 10.6417 12.0968 10.8115 12.4057 10.9079C12.7145 11.0043 13.0422 11.0243 13.3605 10.9662C13.6788 10.9081 13.9782 10.7736 14.2331 10.5743C14.4881 10.375 14.6908 10.1169 14.824 9.822C15.0868 10.6756 15.0563 11.5926 14.7375 12.427C14.4186 13.2613 13.8297 13.9648 13.0646 14.4256C12.2994 14.8864 11.4021 15.0778 10.5155 14.9694C9.62896 14.8609 8.8042 14.4589 8.17264 13.8274C7.54108 13.1958 7.13906 12.371 7.03064 11.4845C6.92223 10.5979 7.11365 9.70058 7.5744 8.93544C8.03516 8.1703 8.73875 7.58138 9.57305 7.26252C10.4074 6.94366 11.3244 6.9132 12.178 7.176Z"
                fill="#FFC100"
              />
            </svg>

            <input
              onChange={props.onChangeCallback}
              value={props.inputValue}
              id="search-mobile"
              type="search"
              placeholder="Search Card..."
              className="bg-transparent focus:outline-none border-none outline-none text-white font-grenze font-light tracking-wide text-xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
