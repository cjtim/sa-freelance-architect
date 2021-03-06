import { Storage } from '@google-cloud/storage'
// import { v4 as uuidv4 } from 'uuid'
// import path from 'path'
import CONFIG from '../config'

const storage = new Storage({
  credentials: CONFIG.FIREBASE_ACC as any,
  projectId: CONFIG.FIREBASE_PROJECT_ID,
})
const bucket = storage.bucket(CONFIG.BUCKET_NAME)

export class BucketServices {
  // static async add(
  //   parentPath: string,
  //   localFileLocation: string,
  //   filename: string = path.basename(localFileLocation),
  // ): Promise<string> {
  //   /*
  //       parentPath must not start with /
  //       but must end with /
  //       example: parentPath = "image/" this is image folder from root
  //                filename = "tim.jpg"
  //       */
  //   try {
  //     const uuid = uuidv4()
  //     const option: UploadOptions = {
  //       destination: `${parentPath}/${filename}`,
  //       gzip: true,
  //       metadata: {
  //         metadata: {
  //           firebaseStorageDownloadTokens: uuid,
  //         },
  //       },
  //     }
  //     const uploadFile = await bucket.upload(localFileLocation, option)
  //     return `https://firebasestorage.googleapis.com/v0/b/${
  //       bucket.name
  //     }/o/${encodeURIComponent(uploadFile[0].name)}?alt=media&token=${uuid}`
  //   } catch (error: any) {
  //     // eslint-disable-next-line no-console
  //     console.error(error.message)
  //     throw error
  //   }
  //   return ''
  // }

  // static async addBinary(
  //   parentPath: string,
  //   filename: string,
  //   data: Buffer,
  // ): Promise<string> {
  //   const uuid = uuidv4()
  //   const destination = `${parentPath}/${filename}`
  //   const option: UploadOptions = {
  //     destination,
  //     gzip: true,
  //     metadata: {
  //       metadata: {
  //         firebaseStorageDownloadTokens: uuid,
  //       },
  //     },
  //   }
  //   await bucket.file(destination).save(data, option)
  //   return `https://firebasestorage.googleapis.com/v0/b/${
  //     bucket.name
  //   }/o/${encodeURIComponent(destination)}?alt=media&token=${uuid}`
  // }

  static async uploadMetadata(ref: string, uuid: string) {
    await bucket.file(ref).setMetadata({
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    })
    return `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(ref)}?alt=media&token=${uuid}`
  }

  static async deleteFileFromUrl(url: string): Promise<boolean> {
    const regex =
      url.match(
        /^https:\/\/firebasestorage.googleapis.com\/v0\/b\/.*\/o\/(.*)\?.*/,
      ) || []
    if (regex.length > 0 && regex[1]) {
      const ref = decodeURIComponent(regex[1])
      await bucket.file(ref).delete({ ignoreNotFound: true })
      return true
    }
    return false
  }

  static async remove(path: string): Promise<any> {
    return bucket.file(path).delete()
  }
}
