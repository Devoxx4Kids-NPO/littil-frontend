import { RestHandler } from 'msw';
import { MockConfig } from './config';
import { MockHandlersSchools } from './school.handler';
import { MockHandlersTeachers } from './teacher.handler';

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

  return handlers;
};
