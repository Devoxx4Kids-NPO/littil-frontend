export interface MockConfigEndpoint {
  base_url: string;
  delay?: number;
}
export interface MockConfig {
  schoolApi?: MockConfigEndpoint;
  teacherApi?: MockConfigEndpoint;
  userApi?: MockConfigEndpoint;
  userSettingsApi?: MockConfigEndpoint;
  searchApi?: MockConfigEndpoint;
}
