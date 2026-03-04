type SharedData = {
  [key: string]: any;
};

const sharedData: SharedData = {};

/**
 * Sets a value in the shared data store.
 */
export const setSharedData = (key: string, value: any): void => {
  sharedData[key] = value;
};

/**
 * Retrieves a value from the shared data store.
 */
export const getSharedData = <T>(key: string): T => {
  return sharedData[key];
};

/**
 * Removes a key from the shared data store.
 */
export const removeSharedData = (key: string): void => {
  delete sharedData[key];
};

/**
 * Checks if a key exists in the shared data store.
 */
export const hasSharedData = (key: string): boolean => {
  return key in sharedData;
};
