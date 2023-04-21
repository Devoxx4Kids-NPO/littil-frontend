import {
  ApiV1GuestTeachersGet200Response,
  GuestTeacher,
} from '../../generated';

export const MOCK_GUEST_TEACHER:
  | GuestTeacher
  | ApiV1GuestTeachersGet200Response = {
  id: '59cc4dfa-62f0-42b0-a78c-b4ebad713993',
  firstName: 'Name',
  prefix: 'of',
  surname: 'Teacher',
  address: 'Straat 1',
  postalCode: '1234AB',
  locale: undefined,
  availability: ['TUESDAY', 'THURSDAY'],
};

export const MOCK_GUEST_TEACHERS: GuestTeacher[] = [
  {
    id: '59cc4dfa-62f0-42b0-a78c-b4ebad713993',
    firstName: 'Name',
    prefix: 'of',
    surname: 'Teacher',
    address: 'Street 1',
    postalCode: '1234AB',
    locale: undefined,
    availability: ['TUESDAY', 'THURSDAY'],
  },
];
