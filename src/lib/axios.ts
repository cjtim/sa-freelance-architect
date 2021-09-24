import axios from 'axios'

const backendInstance = axios.create({})

export async function getLIFFToken() {
  const liff = (await import('@line/liff')).default
  await liff.ready
  backendInstance.defaults.headers.Authorization = `Bearer ${liff.getAccessToken()}`
  return liff.getAccessToken() || ''
}

export async function getLineUid() {
  const liff = (await import('@line/liff')).default
  await liff.ready
  return (await liff.getProfile()).userId || ''
}

export default backendInstance
