// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'store',
      title: 'Store',
      type: 'item',
      url: '/store',
      icon: 'ic:twotone-store',
      breadcrumbs: false,
      permission: 'visible_to_all'
    },
    {
      id: 'sku',
      title: 'SKU',
      type: 'item',
      url: '/sku',
      icon: 'ph:shapes-duotone',
      breadcrumbs: false,
      permission: 'visible_to_all'
    },
    {
      id: 'planning',
      title: 'Planning',
      type: 'item',
      url: '/planning',
      icon: 'solar:chart-2-bold-duotone',
      breadcrumbs: false,
      permission: 'visible_to_all'
    },
    {
      id: 'chart',
      title: 'Chart',
      type: 'item',
      url: '/chart',
      icon: 'healthicons:chart-line',
      breadcrumbs: false,
      permission: 'visible_to_all'
    }
  ]
};

export default dashboard;
