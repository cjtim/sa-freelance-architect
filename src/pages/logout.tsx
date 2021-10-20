import PageLayout from '@/components/PageLayout'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const LogoutPage: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      const liff = (await import('@line/liff')).default
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' })
      if (liff.isLoggedIn()) {
        liff.logout()
      }
      router.replace('/')
    })()
  }, [])
  return (
    <PageLayout windowTitle="Logout">
      <Flex justify="center" align="center">
        Loggin out
      </Flex>
    </PageLayout>
  )
}

export default LogoutPage
