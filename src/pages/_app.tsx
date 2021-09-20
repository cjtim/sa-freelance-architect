import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { useEffect } from 'react'

async function initalLine() {
  const liff = (await import('@line/liff')).default
  await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' })
  if (!liff.isLoggedIn()) {
    const url = window.location.href
    liff.login({ redirectUri: url.includes('logout') ? undefined : url })
  }
  console.log(liff.getAccessToken())
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initalLine()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
