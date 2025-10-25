import {  HandshakeIcon, HeartIcon, PackageIcon, TagIcon,HouseLineIcon, ChartBarIcon, UsersIcon, TrendUpIcon, GiftIcon} from 'phosphor-react-native';

export const CardDashData = [
  {
    title: "Interactions (J'adore)",
    value: 230,
    icon: <HeartIcon size={26} color="#EF4444" />,
    color: "#EF4444",
    key: "likes",
  },
  {
    title: "Échanges réussis",
    value: 45,
    icon: <HandshakeIcon size={26} color="#10B981" />,
    color: "#10B981",
    key: "exchanges",
  },
  {
    title: "Dons effectués",
    value: 18,
    icon: <GiftIcon size={26} color="#F59E0B" />,
    color: "#F59E0B",
    key: "donations",
  },
  {
    title: "Publications totales",
    value: 120,
    icon: <PackageIcon size={26} color="#00A9FF" />,
    color: "#00A9FF",
    key: "posts",
  },
  {
    title: "Ventes effectuées",
    value: 62,
    icon: <TagIcon size={26} color="#03233A" />,
    color: "#03233A",
    key: "sales",
  },
];
  


export const tabsNavigationDash = [
  {  value: 'home',  label: 'Accueil',  icon: HouseLineIcon },
  {  value: 'stats',  label: 'Statistiques',  icon: ChartBarIcon },
  {  value: 'interactions',  label: 'Interactions',  icon: UsersIcon },
  {  value: 'progress',  label: 'Progression',  icon: TrendUpIcon },
];