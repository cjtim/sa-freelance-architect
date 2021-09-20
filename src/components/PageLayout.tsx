import Head from 'next/head'
import React from 'react'

export default function PageLayout({
  windowTitle,
  children,
}: {
  windowTitle: string
  children?: any
}): JSX.Element {
  return (
    <>
      <Head>
        <title>{windowTitle}</title>
      </Head>
      <main>{children}</main>
    </>
  )
}

PageLayout.defaultProps = {
  children: <></>,
}
