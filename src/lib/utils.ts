import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ErrorResponse } from '@/types/utils.types'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isEntityError = <Error>(error: unknown): error is AxiosError<Error> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const isUnauthorizedError = <Error>(error: unknown): error is AxiosError<Error> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export const isExpiredError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return isUnauthorizedError<ErrorResponse<{}>>(error) && error.response?.data.message === 'Jwt expired'
}
