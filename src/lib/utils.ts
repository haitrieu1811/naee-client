import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isEntityError = <Error>(error: unknown): error is AxiosError<Error> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
