import { useAppSelector } from '@/store/hook'
import { Center, Spinner } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

export default function PageLayout({
  windowTitle,
  children,
}: {
  windowTitle: string
  children?: any
}): JSX.Element {
  const { loading: photoLoading } = useAppSelector((state) => state.projects)

  // centralize loading
  const loading = photoLoading
  return (
    <>
      <Head>
        <title>{windowTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {loading ? (
          <Center
            alignItems="center"
            height={window.innerHeight || 'max-content'}
          >
            <Spinner size="xl" />
          </Center>
        ) : (
          children
        )}
      </main>
    </>
  )
}

PageLayout.defaultProps = {
  children: <></>,
}
