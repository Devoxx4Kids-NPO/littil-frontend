type SharedData = {
  [key: string]: any;
};

const sharedData: SharedData = {};

export const setSharedData = (key: string, value: any): void => {
  sharedData[key] = value;
};

// export const getSharedData = <T>(key: string): T | undefined => {
export const getSharedData = <T>(key: string): T => {
  return sharedData[key];
};
