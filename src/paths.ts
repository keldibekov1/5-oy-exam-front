export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    colors: '/dashboard/color', // 🔥 YANGI QATOR
    categories: '/dashboard/category', // 🔥 YANGI KATEGORIYA
    products: '/dashboard/products', // 🔥 YANGI MAHSULOTLAR
    transactions: '/dashboard/transactions', // 🔥 YANGI TRANZAKSIYALAR
    regions: '/dashboard/region', // 🔥 YANGI REGIONLAR
    return: '/dashboard/return', // 🔥 YANGI QAYTARISHLAR
    exchange: '/dashboard/exchange', // 🔥 YANGI ALISHUVLAR
  },
  errors: {
    notFound: '/errors/not-found',
  },
} as const;
