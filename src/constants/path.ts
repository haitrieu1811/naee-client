const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  ADDRESSES: '/profile/addresses',
  PASSWORD: '/profile/password',

  DASHBOARD: '/dashboard',
  DASHBOARD_CUSTOMER: '/dashboard/customer',
  DASHBOARD_ORDER: '/dashboard/order',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_PRODUCT: '/dashboard/product',
  DASHBOARD_PRODUCT_NEW: '/dashboard/product/new',
  DASHBOARD_PRODUCT_CATEGORY: '/dashboard/product-category',
  DASHBOARD_PRODUCT_CATEGORY_NEW: '/dashboard/product-category/new',
  DASHBOARD_PRODUCT_CATEGORY_UPDATE: (productCategoryId: string) => `/dashboard/product-category/${productCategoryId}`,
  DASHBOARD_PRODUCT_BRAND: '/dashboard/brand',
  DASHBOARD_PRODUCT_BRAND_NEW: '/dashboard/brand/new'
} as const

export default PATH
