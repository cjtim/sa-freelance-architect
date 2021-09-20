import axios from 'axios'

export async function getAccessToken() {
  const liff = (await import('@line/liff')).default
  await liff.ready
  return liff.getAccessToken() || ''
}

const backendInstance = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:8080',
})

export { backendInstance }
