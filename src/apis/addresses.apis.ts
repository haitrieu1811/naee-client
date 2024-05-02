import { AddressType } from '@/constants/enum'
import http from '@/lib/http'
import {
  CreateAddressResponse,
  GetAddressResponse,
  GetAllAddressesResponse,
  GetAllProvincesResponse,
  GetDistrictsResponse,
  GetWardsResponse,
  SetDefaultAddressResponse
} from '@/types/addresses.types'
import { OnlyMessageResponse, PaginationReqQuery } from '@/types/utils.types'

const addressesApis = {
  getAllProvinces() {
    return http.get<GetAllProvincesResponse>('/addresses/provinces')
  },

  getDistricts(provinceId: string) {
    return http.get<GetDistrictsResponse>(`/addresses/provinces/${provinceId}/districts`)
  },

  getWards({ provinceId, districtId }: { provinceId: string; districtId: string }) {
    return http.get<GetWardsResponse>(`/addresses/provinces/${provinceId}/districts/${districtId}/wards`)
  },

  create(body: {
    fullName: string
    phoneNumber: string
    type: AddressType
    provinceId: string
    districtId: string
    wardId: string
    specificAddress: string
  }) {
    return http.post<CreateAddressResponse>('/addresses', body)
  },

  getMyAddresses(params?: PaginationReqQuery) {
    return http.get<GetAllAddressesResponse>('/addresses/all', { params })
  },

  setDefault(addressId: string) {
    return http.post<SetDefaultAddressResponse>(`/addresses/${addressId}/set-default`)
  },

  getOne(addressId: string) {
    return http.get<GetAddressResponse>(`/addresses/${addressId}`)
  },

  deleteOne(addressId: string) {
    return http.delete<OnlyMessageResponse>(`/addresses/${addressId}`)
  }
} as const

export default addressesApis
