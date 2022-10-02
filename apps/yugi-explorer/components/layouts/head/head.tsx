import NextHead from 'next/head';
import React from 'react';

/* eslint-disable-next-line */
export interface HeadProps {
  title?:string;
  description?:string;
  children?:React.ReactNode
}

export function Head(props: HeadProps) {
  let locationOrigin="localhost:4200"
  let origin=''
  if(typeof window !== 'undefined'){
    locationOrigin=window.location.origin
    origin=`${location.protocol}//${location.host}${location.pathname}`
  }


  const title=props.title || "Welcome to Yugi Explorer"
  return (
    <NextHead>
      <title>{""+title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico"/>
      <meta name="title" content={""+title} />
      <meta
        name="description"
        content={props.description || " A place where you can search yugioh cards"}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={origin} />
      <meta
        property="og:title"
        content={props.title || " Welcome to Yugi Explorer"}
      />
      <meta
        property="og:description"
        content={props.description || " A place where you can search yugioh cards"}
      />
      <meta
        property="og:image"
        content={`${locationOrigin}/api/og?title=${props.title || ""}`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={origin} />
      <meta
        property="twitter:title"
        content={props.title || " Welcome to Yugi Explorer"}
      />
      <meta
        property="twitter:description"
        content={props.description || " A place where you can search yugioh cards"}
      />
      <meta
        property="twitter:image"
        content={`${locationOrigin}/api/og?title=${props.title || ""}`}
      ></meta>
      {props.children}
    </NextHead>
  );
}

export default Head;
