import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'folder' }, // 🔥 Yangi kategoriya
  { key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'phone' }, // 🔥 YANGI MAHSULOTLAR
  { key: 'transactions', title: 'Transactions', href: paths.dashboard.transactions, icon: 'repeat' }, // 🔥 Yangi tranzaksiyalar
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'colors', title: 'Colors', href: paths.dashboard.colors, icon: 'palette' }, // 🔥 Qo‘shildi
  { key: 'regions', title: 'Regions', href: paths.dashboard.regions, icon: 'map-pin' }, // 🔥 Yangi regionlar
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'return', title: 'Returns', href: paths.dashboard.return, icon: 'arrow-counter-clockwise' }, // 🔥 Yangi qaytarmalar
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
  { key: 'exchange', title: 'Exchange', href: paths.dashboard.exchange, icon: 'repeat' }, // 🔥 Yangi alishuvlar
] satisfies NavItemConfig[];
