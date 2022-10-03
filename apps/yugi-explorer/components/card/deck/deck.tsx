import NextImage from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface DeckProps {
  imageSrc: string;
  id: string;
  callbackDeck?: (props: any) => void;
}

export function Deck(props: DeckProps) {
  const [deck, setdeck] = useState(false);
  function getDeck() {
    const data = localStorage.getItem('deck');
    return JSON.parse(data);
  }

  function addDeck() {
    const data = getDeck() || [];
    const check = data.filter((item: any) => item.id === props.id);
    if (check.length === 0) {
      data.push({
        id: props.id,
        imageSrc: props.imageSrc,
      });
      setdeck(true);
    } else {
      data.splice(data.map((item) => item.id).indexOf(props.id), 1);
      setdeck(false);
    }
    localStorage.setItem('deck', JSON.stringify(data));
    if (props.callbackDeck) {
      props.callbackDeck(props.id);
    }
  }

  useEffect(() => {
    const data = getDeck() || [];
    const check = data.filter((item: any) => item.id === props.id);
    if (check.length > 0) {
      setdeck(true);
    } else {
      setdeck(false);
    }
  }, []);
  return (
    <motion.div
      layout
      className={'relative block w-full h-fit flip-box yugi-card'}
      layoutId={`picture${props.id}`}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      animate={{ scale: 1 }}
    >
      <div className="absolute left-0 w-full h-full flex justify-start pl-24 pb-24">
        <motion.button
          aria-label='Add to Deck'
          id="add-deck"
          onClick={addDeck}
          className={'action-deck z-20'}
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3_6)">
              <path
                d="M28.09 9.73998C27.6961 9.74584 27.3052 9.80987 26.93 9.92998C26.74 8.68998 25.38 7.74998 23.66 7.74998C23.1386 7.73274 22.6188 7.81767 22.13 7.99998C21.8191 7.45255 21.3612 7.00314 20.808 6.70267C20.2547 6.40221 19.6284 6.26271 19 6.29998C18.4511 6.27555 17.9042 6.3826 17.405 6.61219C16.9058 6.84179 16.4687 7.18731 16.13 7.61998C15.5582 7.28106 14.9047 7.10471 14.24 7.10998C13.4436 7.05728 12.6583 7.31886 12.0525 7.8386C11.4468 8.35834 11.0689 9.09481 11 9.88998V10.8C9.94 11.2 6.89 12.6 6.09 15.64C5.29 18.68 6.43 23.64 8.78 27.42C10.3598 29.8828 12.3563 32.0519 14.68 33.83C14.8343 33.9412 15.0198 34.0007 15.21 34H25.55C25.7491 33.9978 25.9421 33.9312 26.1 33.81C27.8957 32.1551 29.1944 30.0323 29.85 27.68C30.984 24.5827 31.5135 21.2967 31.41 18V12.5C31.3289 11.6966 30.9355 10.9571 30.3145 10.4409C29.6936 9.92468 28.8947 9.67297 28.09 9.73998V9.73998ZM29.61 18C29.7191 21.1165 29.2198 24.2244 28.14 27.15C27.5742 29.0426 26.5665 30.7735 25.2 32.2H15.47C13.4359 30.5901 11.6793 28.6578 10.27 26.48C7.9 22.62 7.27 18.25 7.79 16.09C8.06264 15.3414 8.48916 14.6583 9.04206 14.0848C9.59496 13.5112 10.2619 13.0599 11 12.76V20.41C11 20.6487 11.0948 20.8776 11.2636 21.0464C11.4324 21.2152 11.6613 21.31 11.9 21.31C12.1387 21.31 12.3676 21.2152 12.5364 21.0464C12.7052 20.8776 12.8 20.6487 12.8 20.41V9.88998C12.8 9.41998 13.39 8.88998 14.26 8.88998C15.13 8.88998 15.75 9.40998 15.75 9.88998V15.61H17.55V8.80998C17.55 8.52998 18.13 8.09998 19.01 8.09998C19.89 8.09998 20.54 8.57998 20.54 8.84998V15.74H22.34V9.99998L22.51 9.87998C22.8629 9.65864 23.2736 9.54725 23.69 9.55998C24.62 9.55998 25.19 9.99998 25.19 10.24V16.74H27V11.87C27.3297 11.6458 27.7214 11.5304 28.12 11.54C28.98 11.54 29.64 12.05 29.64 12.48L29.61 18Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_6">
                <rect width="36" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </motion.button>
      </div>
      <Link key={props.id} href={`/${props.id}`} passHref>
        <a className="block w-full relative flip-box-inner">
          <div
            className={
              'flip-transition block top-0 bottom-0 left-0 right-0 relative '}
          >
            <NextImage
              src={props.imageSrc}
              height={456}
              width={313}
              layout="responsive"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="/image/CardBack.jpg"
            />
          </div>
        </a>
      </Link>
    </motion.div>
  );
}

export default Deck;
