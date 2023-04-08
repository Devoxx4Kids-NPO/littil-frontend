import { SearchResult, UserType } from '../../generated';

export const MOCK_SEARCH_SCHOOL: SearchResult = {
  id: '9beae92a-c735-454d-9535-20a54b411b5c',
  name: 'Schoolname',
  latitude: 54.3,
  longitude: 4.5,
  distance: 3,
  userType: UserType.School,
};

export const MOCK_SEARCH_TEACHER: SearchResult = {
  id: '59cc4dfa-62f0-42b0-a78c-b4ebad713993',
  name: 'Teachername',
  latitude: 54.8,
  longitude: 4.2,
  distance: 1,
  userType: UserType.GuestTeacher,
};

export const MOCK_SEARCH: SearchResult[] = [
  MOCK_SEARCH_SCHOOL,
  MOCK_SEARCH_TEACHER,
];
