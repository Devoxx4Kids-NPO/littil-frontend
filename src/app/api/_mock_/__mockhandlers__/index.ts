import { RestHandler } from 'msw';
import { MockConfig } from './config';
import { MockHandlersSchools } from './school.handler';
import { MockHandlersTeachers } from './teacher.handler';
import { MockHandlersUser } from './user.handler';
import { MockHandlersUserSettings } from './userSettings.handler';
import { MockHandlersSearch } from './search.handler';

export const getHandlers = (config: MockConfig): RestHandler[] => {
  const handlers = [];

  if (config.schoolApi) {
    const handler = new MockHandlersSchools(config.schoolApi).handlers;
    handlers.push(...handler);
  }

  if (config.teacherApi) {
    const handler = new MockHandlersTeachers(config.teacherApi).handlers;
    handlers.push(...handler);
  }

  if (config.searchApi) {
    const handler = new MockHandlersSearch(config.searchApi).handlers;
    handlers.push(...handler);
  }

  if (config.userApi) {
    const handler = new MockHandlersUser(config.userApi).handlers;
    handlers.push(...handler);
  }

  if (config.userSettingsApi) {
    const handler = new MockHandlersUserSettings(config.userSettingsApi)
      .handlers;
    handlers.push(...handler);
  }

  return handlers;
};
