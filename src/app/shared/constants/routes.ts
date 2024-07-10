export const appPath = {
  DEFAULT: '',
  DETAILED: 'detailed',
  LOGIN: 'login',
  MAIN: 'main',
  NO_MATCH: '**',
  NOT_FOUND: '404',
} as const;

export const appRoute = {
  DETAILED: `/${appPath.DETAILED}`,
  LOGIN: `/${appPath.LOGIN}`,
  MAIN: `/${appPath.MAIN}`,
  NOT_FOUND: `/${appPath.NOT_FOUND}`,
} as const;

export const APP_TITLE = 'Youtube | {{title}}';
