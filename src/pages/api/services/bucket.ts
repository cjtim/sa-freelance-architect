import { Storage, UploadOptions } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'
// import path from 'path'
import CONFIG from '../config'

const storage = new Storage({
  credentials: CONFIG.FIREBASE_ACC as any,
  projectId: CONFIG.FIREBASE_ACC.project_id,
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

  static async addBinary(
    parentPath: string,
    filename: string,
    data: Buffer,
  ): Promise<string> {
    const uuid = uuidv4()
    const destination = `${parentPath}/${filename}`
    const option: UploadOptions = {
      destination,
      gzip: true,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    }
    await bucket.file(destination).save(data, option)
    return `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(destination)}?alt=media&token=${uuid}`
  }

  static async remove(path: string): Promise<any> {
    return bucket.file(path).delete()
  }
}
