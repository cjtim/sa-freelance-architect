import backendInstance from '@/lib/axios'
import { createStandaloneToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

const AxiosErrorToast = () => {
  const toast = createStandaloneToast()

  useEffect(() => {
    backendInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error && error?.response?.status) {
          toast({
            title: 'An error occurred.',
            description: JSON.stringify(error.message),
            status: 'error',
            duration: null,
            isClosable: true,
          })
        }
        return Promise.reject(error)
      },
    )
  })
  return null
}

export default AxiosErrorToast
