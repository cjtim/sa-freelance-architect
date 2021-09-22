const CONFIG = {
  BUCKET_NAME: process.env.BUCKET_NAME || '',
  FIREBASE_ACC: JSON.parse(process.env.FIREBASE_ACC || ''),
  // FIREBASE_DB: process.env.FIREBASE_DB || '',
  LINE_VERIFY_LIFF_TOKEN_API:
    'https://api.line.me/oauth2/v2.1/verify?access_token=',
  LINE_GET_PROFILE_API: 'https://api.line.me/v2/profile',
  LINE_CHANNEL_TOKEN: process.env.LINE_CHANNEL_TOKEN || '',
  LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET || '',
  FRONT_END_URL: process.env.FRONT_END_URL || '',
  PSQL_HOSTNAME: process.env.PSQL_HOSTNAME || '',
  PSQL_DATABASE: process.env.PSQL_DATABASE || '',
  PSQL_USERNAME: process.env.PSQL_USERNAME || '',
  PSQL_PASSWORD: process.env.PSQL_PASSWORD || '',
}

export default CONFIG
