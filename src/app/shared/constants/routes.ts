export const appPath = {
  ADMIN: 'admin',
  DEFAULT: '',
  DETAILED: 'detailed',
  LOGIN: 'login',
  MAIN: 'main',
  NO_MATCH: '**',
  NOT_FOUND: '404',
} as const;

export const appRoute = {
  ADMIN: `/${appPath.ADMIN}`,
  DETAILED: `/${appPath.DETAILED}`,
  LOGIN: `/${appPath.LOGIN}`,
  MAIN: `/${appPath.MAIN}`,
  NOT_FOUND: `/${appPath.NOT_FOUND}`,
} as const;

export const APP_TITLE = 'Youtube | {{title}}';
