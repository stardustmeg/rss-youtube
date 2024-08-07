export const appPath = {
  ADMIN: 'admin',
  DEFAULT: '',
  DETAILED: 'detailed',
  FAVORITES: 'favorites',
  LOGIN: 'login',
  MAIN: 'main',
  NO_MATCH: '**',
  NOT_FOUND: '404',
} as const;

export const appRoute = {
  ADMIN: `/${appPath.ADMIN}`,
  DETAILED: `/${appPath.DETAILED}`,
  FAVORITES: `/${appPath.FAVORITES}`,
  LOGIN: `/${appPath.LOGIN}`,
  MAIN: `/${appPath.MAIN}`,
  NOT_FOUND: `/${appPath.NOT_FOUND}`,
} as const;

export const APP_TITLE = 'Youtube | {{title}}';
