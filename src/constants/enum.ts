export enum UserStatus {
  Active,
  Inactive
}

export enum UserRole {
  Admin,
  User
}

export enum TokenType {
  Access,
  Refresh,
  VerifyEmail,
  ForgotPassword
}

export enum UserVerifyStatus {
  Verified,
  Unverified
}

export enum FileType {
  Image,
  Video
}

export enum AddressType {
  Home,
  Office
}

export enum ProductStatus {
  Active,
  Inactive
}

export enum ProductDiscountType {
  Money,
  Percent
}

export enum CartItemStatus {
  InCart,
  NotInCart
}

export enum OrderStatus {
  WaitForConfirmation,
  Confirmed,
  BeingTransported,
  Accomplished,
  Cancelled
}
