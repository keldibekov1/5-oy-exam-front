import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Palette as PaletteIcon } from '@phosphor-icons/react/dist/ssr/Palette'; // 🎨 Bu YANGI qator
import { Folder as FolderIcon } from '@phosphor-icons/react/dist/ssr/Folder'; // 🔥 YANGI KATEGORIYA IKONKASI
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone'; // 📱 Telefon ikonkasi
import { MapPin as MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin'; // 🔥 YANGI REGION IKONKASI


export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  palette: PaletteIcon, // 🎨 Bu YANGI qator
  'folder': FolderIcon, // 🔥 YANGI KATEGORIYA IKONKASI
  'phone': PhoneIcon, // 📱 Telefon ikonkasi
  'map-pin': MapPinIcon, // 🔥 YANGI REGION IKONKASI
} as Record<string, Icon>;
