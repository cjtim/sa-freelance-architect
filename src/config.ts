export const NEXT_CONFIG: Record<string, string> = {
  BUCKET_NAME: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID || '',
}

export const apiEndpoints = {
  projects: '/api/projects',
  files: '/api/files',
  photos: '/api/db',
  customers: '/api/customers',
}
