import NextImage from 'next/image';
import FilterDesktop from '../../components/filter/desktop/desktop';
import FilterMobile from '../../components/filter/mobile/mobile';
import { FormEvent, useEffect, useState } from 'react';
import CardDeck from '../../components/card/deck/deck';
import Head from '../../components/layouts/head/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
/* eslint-disable-next-line */
export interface DeckProps {}

export function Deck() {
  const router=useRouter()
  const searchQuery = router?router.query.title:'';

  const [filterParams, setfilterParams] = useState({
    title: '',
    archType: '',
  });
  const [cardlist, setcardlist] = useState([]);

  function handleScroll() {
    sessionStorage.setItem('scrollY', JSON.stringify(window.scrollY));
  }

  function callBackDeck(id) {
    const filter = cardlist.filter((item) => item.id !== id);
    setcardlist([...filter]);
  }

  useEffect(() => {
    const decklist=JSON.parse(localStorage.getItem('deck'))||[]
    setcardlist(decklist);
  }, []);

  useEffect(() => {
    const sessionScroll = JSON.parse(sessionStorage.getItem('scrollY'));
    setTimeout(() => {
      window.scrollTo({
        top: sessionScroll,
        behavior: 'auto',
      });
    }, 1);
  }, []);

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

  function onChangeSearch(e: FormEvent<HTMLInputElement>) {
    setfilterParams({
      ...filterParams,
      title: e.currentTarget.value,
    });

    const value = e.currentTarget.value;
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
      <Head title="Your Deck" description="Deck contains card you already pick">
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <div className="min-h-screen bg-blue-primary max-w-screen-2xl mx-auto py-14">
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

        <h1 className="font-grenze text-6xl text-center text-yellow-primary  mt-5 px-5 md:px-14">
          Yugi Explorer
        </h1>

        <FilterDesktop
          onChangeCallback={onChangeSearch}
          inputValue={filterParams.title}
          type="deck"
        />

        <FilterMobile
          onChangeCallback={onChangeSearch}
          inputValue={filterParams.title}
          type="deck"
        />

        <div className="grid grid-cols-12 gap-5 mt-10 px-5 md:px-14">
          {cardlist.length == 0 && (
            <div className="col-span-12">
              <h1 className="text-center text-2xl font-grenze text-yellow-primary">
                You have no card
              </h1>
            </div>
          )}
          {cardlist.length > 0 &&
            cardlist
              .filter((el: any) => el.id.includes(searchQuery||""))
              .map((card: any, i: number) => (
                <div key={card.id} className="col-span-6 md:col-span-2">
                  <CardDeck
                    id={card.id}
                    imageSrc={card.imageSrc}
                    callbackDeck={callBackDeck}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default Deck;
