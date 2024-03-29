export interface LittilAwsAccount {
  id: string;
  name: string;
}

export const isLittilAwsAccount = (input: unknown): input is LittilAwsAccount =>
  typeof input === 'object'
  && typeof (input as any).id === 'string'
  && typeof (input as any).name === 'string';

export interface LittilAwsAccountConfiguration {
  accounts: LittilAwsAccount[];
}

export const isLittilAwsAccountConfiguration = (input: unknown): input is LittilAwsAccountConfiguration =>
  typeof input === 'object'
  && !Array.isArray(input)
  && Array.isArray((input as any).accounts)
  && ((input as any).accounts as any[]).every(account => isLittilAwsAccount(account));
