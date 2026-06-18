export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/employe',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  /*{
    id: 'compte',
    title: 'Compte',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'demande',
        title: 'Compte des utilisateurs',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'modification',
            title: 'Gestion des comptes',
            type: 'item',
            icon: 'ti ti-key',
            url: '/guest/register',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'demande',
            title: 'Historique d utilisation',
            type: 'item',
            icon: 'ti ti-key',
            url: '/guest/login',
            target: true,
            breadcrumbs: false
          },
          
        ]
      }
    ]
  },*/
  {
    id: 'employe',
    title: 'Votre Congé',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Gestion',
        title: 'Demande congé',
        type: 'item',
        classes: 'nav-item',
        url: '/employe/mes-demandes',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Historique de congé',
        type: 'item',
        classes: 'nav-item',
        url: '/employe/historiques',
        icon: 'ti ti-brush'
      }
    ]
  },
  {
    id: 'autres',
    title: 'Autres',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Calendrier',
        type: 'item',
        url: '/employe/calendrier',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'societe',
        title: 'Notre société',
        type: 'item',
        classes: 'nav-item',
        url: 'localhost:4200',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  },/*
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'localhost:4200',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  }*/
];
