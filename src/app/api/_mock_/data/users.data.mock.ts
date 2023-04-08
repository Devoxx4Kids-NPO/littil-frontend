import { Provider, User } from '../../generated';

export const MOCK_SCHOOL_USER: User = {
  id: '1234',
  emailAddress: 'schoolUser@mail.com',
  provider: Provider.Auth0,
  providerId: '1234',
  roles: ['guest_teachers', 'schools'],
};

export const MOCK_TEACHER_USER: User = {
  id: '5678',
  emailAddress: 'teacherUser@mail.com',
  provider: Provider.Auth0,
  providerId: '5678',
  roles: ['guest_teachers', 'schools'],
};

export const MOCK_USERS: User[] = [MOCK_SCHOOL_USER, MOCK_TEACHER_USER];
