// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//import { enableMocking } from '../app/api/_mock_/__mockhandlers__/browser';
//import { getLittilConfigFromWindow } from '../littilConfig';

//const littilConfig = getLittilConfigFromWindow();

export const environment = {
  production: false,
};

// enableMocking({
//   schoolApi: {
//     base_url: `${littilConfig.apiHost}/api/v1/schools`,
//     delay: 0,
//   },
//   teacherApi: {
//     base_url: `${littilConfig.apiHost}/api/v1/guest-teachers`,
//     delay: 0,
//   },
//   searchApi: {
//     base_url: `${littilConfig.apiHost}/api/v1/search`,
//     delay: 0,
//   },
//   userApi: {
//     base_url: `${littilConfig.apiHost}/api/v1/users`,
//     delay: 0,
//   },
//   userSettingsApi: {
//     base_url: `${littilConfig.apiHost}/api/v1/user-settings`,
//     delay: 0,
//   },
// });

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
