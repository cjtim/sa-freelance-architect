import { NEXT_CONFIG } from '@/config'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

export const getBucket = () => {
  if (!getApps().length) {
    initializeApp({
      storageBucket: NEXT_CONFIG.BUCKET_NAME,
      projectId: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      apiKey: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_API_KEY,
    })
  }
  // Get a reference to the storage service, which is used to create references in your storage bucket
  return getStorage(getApp())
}
