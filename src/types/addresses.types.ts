import { AddressType } from '@/constants/enum'
import { Pagination, SuccessResponse } from '@/types/utils.types'

export type Province = {
  _id: string
  code: string
  name: string
}

export type District = {
  id: string
  name: string
}

export type Ward = {
  id: string
  name: string
  prefix: string
}

export type OriginalAddress = {
  _id: string
  userId: string
  fullName: string
  phoneNumber: string
  type: AddressType
  provinceId: string
  districtId: string
  wardId: string
  streetId: string
  specificAddress: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export type Address = {
  _id: string
  fullName: string
  phoneNumber: string
  type: AddressType
  province: {
    _id: string
    code: string
    name: string
  }
  district: {
    id: string
    name: string
  }
  ward: {
    id: string
    name: string
    prefix: string
  }
  street:
    | {
        id: string
        name: string
        prefix: string
      }
    | string
  specificAddress: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export type GetAllProvincesResponse = SuccessResponse<{
  provinces: Province[]
  totalRows: number
}>

export type GetDistrictsResponse = SuccessResponse<{
  districts: District[]
  totalRows: number
}>

export type GetWardsResponse = SuccessResponse<{
  wards: Ward[]
  totalRows: number
}>

export type CreateAddressResponse = SuccessResponse<{
  address: OriginalAddress
}>

export type GetAllAddressesResponse = SuccessResponse<{
  addresses: Address[]
  pagination: Pagination
}>

export type SetDefaultAddressResponse = SuccessResponse<{
  address: OriginalAddress
}>

export type GetAddressResponse = SuccessResponse<{
  address: Address
}>
