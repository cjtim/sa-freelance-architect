import backendInstance from '@/lib/axios'
import { createStandaloneToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

const AxiosErrorToast = () => {
  const [error, setError] = useState<AxiosError>()
  const toast = createStandaloneToast()

  useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred.',
        description: JSON.stringify(error.message),
        status: 'error',
        duration: null,
        isClosable: true,
      })
    }
  }, [error])

  useEffect(() => {
    backendInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error && error?.response?.status) {
          setError(error)
        }
        return Promise.reject(error)
      },
    )
  })
  return null
}

export default AxiosErrorToast
