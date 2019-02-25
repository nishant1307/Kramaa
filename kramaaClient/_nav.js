
export default {
  items: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'cui-home'
    },
    {
      name: 'Projects',
      icon: 'cui-list',
      children: [
        {
          name: 'View Projects',
          url: '/projects',
          icon: 'cui-magnifying-glass',
        }
      ]
    },
    {
      name: 'Devices',
      url: '/devices',
      icon: 'fa fa-microchip',
    },
    {
      name: 'Things',
      url: '/things',
      icon: 'fa fa-shopping-bag',
    },
    {
      name: 'Analytics',
      url: '/theme/typography',
      icon: 'cui-graph',
      attributes: { disabled: true },
    },
    {
      name: 'Explorer',
      url: '/theme/typography',
      icon: 'fa fa-binoculars',
      attributes: { disabled: true },
    },
    {
      name: 'Store',
      url: '/theme/typography',
      icon: 'fa fa-cart-plus',
      attributes: { disabled: true },
    },
    {
      name: 'APIs',
      url: '/theme/typography',
      icon: 'fa fa-cart-plus',
      attributes: { disabled: true },
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'cui-cog'
    },
    {
      name: 'Plans',
      url: '/theme/typography',
      icon: 'fa fa-shopping-cart',
      attributes: { disabled: true },
    },
    {
      name: 'Support',
      url: '/theme/typography',
      icon: 'fa fa-support',
      attributes: { disabled: true },
    }
  ]
};
