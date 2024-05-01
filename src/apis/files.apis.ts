import http from '@/lib/http'
import { UploadImageResponse } from '@/types/utils.types'

const filesApis = {
  uploadImage(body: FormData) {
    return http.post<UploadImageResponse>('/files/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
} as const

export default filesApis
