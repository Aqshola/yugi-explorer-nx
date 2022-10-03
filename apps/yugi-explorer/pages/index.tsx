import NextImage from 'next/image';
import Card from '../components/card/explore/explore';
import { FormEvent, useEffect, useState } from 'react';
import fetcher from '../utils/fetcher';
import { AnimatePresence } from 'framer-motion';
import Loading from '../components/loading/loading';
import useSWRInfinite from 'swr/infinite';
import { YugiCardType } from '../types/card';
import FilterDesktop from '../components/filter/desktop/desktop';
import FilterMobile from '../components/filter/mobile/mobile';
import Head from '../components/layouts/head/head';
import { useRouter } from 'next/router';
import usePreserveScroll from '../hooks/use-preserve-scroll/use-preserve-scroll';
import Link from 'next/link';
import Layout from '../components/layouts/layout/layout';

const PAGE_SIZE = 15;

export function Index() {
  const router = useRouter();
  const searchQuery = router?router.query.title:'';
  const [filterParams, setfilterParams] = useState({
    title: searchQuery||"",
    archType: '',
  });

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
    (index) => {
      return `https://db.ygoprodeck.com/api/v7/cardinfo.php?sort=name&num=${PAGE_SIZE}&fname=${
        searchQuery || ''
      }&offset=${index * PAGE_SIZE}`;
    },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const parseCards = data ? data.map((child) => child.data) : [];
  const cardlist = [].concat(...parseCards);
  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined' && !error);

  const isEmpty = parseCards?.[0]?.length === 0 || parseCards[0] === undefined;
  const isReachingEnd =
    isEmpty || (data && parseCards?.[0]?.length < PAGE_SIZE);

  function handleScroll() {
    const pageOffset = window.scrollY + window.innerHeight;
    const bodyOffsetHeight = document.body.offsetHeight;

    if (pageOffset >= bodyOffsetHeight - 100) {
      if (!isReachingEnd && !isEmpty) {
        setSize(size + 1);
      }
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

  usePreserveScroll(router);

  function onChangeSearch(e: FormEvent<HTMLInputElement>) {
    const value=e.currentTarget.value
    setfilterParams({
      ...filterParams,
      title: e.currentTarget.value,
    });
    const debounce = setTimeout(() => {
      router.push('?title=' +value);
    }, 2000);

    return () => clearTimeout(debounce);
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <Layout>
        <Link href={'/'} passHref>
          <a aria-label='Home'>
            <div className="px-5 md:px-14 mx-auto w-fit h-fit ">
              <NextImage
                aria-label='YugiOh Logo'
                src={'/image/logo.png'}
                objectFit="cover"
                width={356}
                height={125}
              />
            </div>
          </a>
        </Link>

        <h1 className="px-5 md:px-14 font-grenze text-6xl text-center text-yellow-primary  mt-5">
          Yugi Explorer
        </h1>

        <FilterDesktop
          onChangeCallback={onChangeSearch}
          inputValue={filterParams.title.toString()}
          type="main"
        />

        <FilterMobile
          onChangeCallback={onChangeSearch}
          inputValue={filterParams.title.toString()}
          type="main"
        />

        {!isLoadingInitialData && isEmpty && (
          <h2 className="text-center text-4xl mt-10 text-yellow-primary font-grenze font-semibold">
            No Cards Found
          </h2>
        )}
        <div className="w-full"></div>
        <div className="grid grid-cols-12 gap-5 mt-10 px-5 md:px-14">
          {data &&
            !isLoadingInitialData &&
            !isEmpty &&
            cardlist.map((card: YugiCardType, i: number) => (
              <div
                key={card.id}
                className="col-span-6 md:col-span-3 lg:col-span-2 flex h-fit"
              >
                <Card id={card.name} imageSrc={card.card_images[0].image_url} />
              </div>
            ))}
        </div>

        {(!data || isLoadingMore || isLoadingInitialData) && (
          <AnimatePresence>
            <div className="mx-auto w-fit h-fit">
              <Loading />
            </div>
          </AnimatePresence>
        )}
      </Layout>
    </>
  );
}

export default Index;
