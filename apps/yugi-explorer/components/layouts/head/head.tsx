import NextHead from 'next/head';
import React from 'react';

/* eslint-disable-next-line */
export interface HeadProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Head(props: HeadProps) {
  let locationOrigin = process.env.NX_DEPLOY_URL;
  let origin = '';
  if (typeof window !== 'undefined') {
    locationOrigin = window.location.origin;
    origin = `${location.protocol}//${location.host}${location.pathname}`;
  }

  const title = props.title || 'Welcome to Yugi Explorer';
  return (
    <NextHead>
      <title>{'' + title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
      <meta name="title" content={'' + title} />
      <meta
        name="description"
        content={
          props.description || ' A place where you can search yugioh cards'
        }
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={'Yugi Explorer'} />
      <meta
        property="og:description"
        content={
          props.description || ' A place where you can search yugioh cards'
        }
      />
      <meta
        property="og:title"
        content={props.title || ' Welcome to Yugi Explorer'}
      />
      <meta
        name="image"
        property="og:image"
        content={`${process.env.NX_DEPLOY_URL}/api/og?title=${
          props.title || 'Yugi Explorer'
        }&logo=${process.env.NX_DEPLOY_URL}/image/logo.jpg`}
      />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="Yugi Explorer" />
      <meta
        name="twitter:title"
        content={props.title || ' Welcome to Yugi Explorer'}
      />
      <meta
        name="twitter:description"
        content={
          props.description || ' A place where you can search yugioh cards'
        }
      />
      <meta
        name="twitter:image"
        content={`${process.env.NX_DEPLOY_URL}/api/og?title=${
          props.title || 'Yugi Explorer'
        }&logo=${process.env.NX_DEPLOY_URL}/image/logo.jpg`}
      />
      {props.children}
    </NextHead>
  );
}

export default Head;
