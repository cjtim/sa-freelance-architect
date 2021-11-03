export const NEXT_CONFIG: Record<string, string> = {
  BUCKET_NAME: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID || '',
}

export const apiEndpoints = {
  healthCheck: '/api/health',
  projects: '/api/projects',
  customers: '/api/customers',
  furnitures: '/api/furnitures',
  fileList: '/api/fileList',
  contracts: '/api/contracts',
  projectFurnitures: '/api/projectFurnitures',
  deliverTasks: '/api/deliverTasks',
  receipts: '/api/receipts',
}
