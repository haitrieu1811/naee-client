import { FileType } from '@/constants/enum'

export type SuccessResponse<Data> = {
  message: string
  data: Data
}

export type ErrorResponse<Error> = {
  message: string
  errors: Error
}

export type OnlyMessageResponse = {
  message: string
}

export type AuthResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
}>

export type UploadImageResponse = SuccessResponse<{
  images: {
    _id: string
    name: string
    type: FileType.Image
    url: string
  }[]
}>
