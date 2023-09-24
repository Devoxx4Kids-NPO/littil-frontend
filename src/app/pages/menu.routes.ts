export enum MenuType {
  Default,
  Admin,
}

export interface IMenuItem {
  path: string;
  menuText: string;
  type: MenuType;
  disabled: boolean;
  subRoutes?: IMenuItem[];
}

export const menuRoutes: IMenuItem[] = [
  {
    path: '/home',
    menuText: 'Home',
    type: MenuType.Default,
    disabled: false,
  },
  {
    path: '/admin/search',
    menuText: 'Zoeken',
    type: MenuType.Admin,
    disabled: true,
  },
  {
    path: '/about-us',
    menuText: 'Over ons',
    type: MenuType.Default,
    disabled: false,
  },
  {
    path: '/info',
    menuText: 'Informatie',
    type: MenuType.Default,
    disabled: false,
    subRoutes: [
      {
        path: '/info/schools',
        menuText: 'Scholen',
        type: MenuType.Default,
        disabled: false,
      },
      {
        path: '/info/it-specialists',
        menuText: 'IT Specialisten',
        type: MenuType.Default,
        disabled: false,
      },
      {
        path: '/info/sponsors',
        menuText: 'Sponsors',
        type: MenuType.Default,
        disabled: false,
      },
    ],
  },
  {
    path: '/contact',
    menuText: 'Contact',
    type: MenuType.Default,
    disabled: false,
  },
  {
    path: '/devoxx4kids',
    menuText: 'Devoxx4Kids',
    type: MenuType.Default,
    disabled: false,
  },
];
