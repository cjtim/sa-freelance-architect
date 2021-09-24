import { AppProps } from 'next/app'
import { ChakraProvider, Spinner, Center } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import backendInstance from '@/lib/axios'
import AxiosErrorToast from '@/components/AxiosErrorToast'
import { NEXT_CONFIG } from '@/config'
import { useRouter } from 'next/router'

async function initalLine() {
  const liff = (await import('@line/liff')).default
  await liff.init({ liffId: NEXT_CONFIG.NEXT_PUBLIC_LIFF_ID })
  if (!liff.isLoggedIn()) {
    const url = window.location.href
    liff.login({ redirectUri: url.includes('logout') ? undefined : url })
    return
  }
  // assign Authorization to every backendInstance ***
  backendInstance.defaults.headers.common.Authorization = `Bearer ${liff.getAccessToken()}`
  // eslint-disable-next-line no-console
  console.log(liff.getAccessToken())
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loggingin, setLoggingin] = useState(true)
  const [routing, setRouting] = useState(true)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setRouting(true))
    router.events.on('routeChangeComplete', () => setRouting(false))
    router.events.on('routeChangeError', () => router.reload())
    initalLine().then(() => setLoggingin(false))
  }, [])

  const loading = routing || loggingin
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
