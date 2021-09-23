import { AppProps } from 'next/app'
import { ChakraProvider, Spinner, Center } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import backendInstance from '@/lib/axios'
import AxiosErrorToast from '@/components/AxiosErrorToast'

async function initalLine() {
  const liff = (await import('@line/liff')).default
  await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' })
  if (!liff.isLoggedIn()) {
    const url = window.location.href
    liff.login({ redirectUri: url.includes('logout') ? undefined : url })
  }
  // assign Authorization to every backendInstance ***
  backendInstance.defaults.headers.common.Authorization = `Bearer ${liff.getAccessToken()}`
  // eslint-disable-next-line no-console
  console.log(await liff.getAccessToken())
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initalLine().then(() => setLoading(false))
  }, [])

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AxiosErrorToast />
        {typeof window !== 'undefined' && loading ? (
          <Center
            alignItems="center"
            height={window?.innerHeight || 'max-content'}
          >
            <Spinner size="xl" />
          </Center>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </Provider>
  )
}
