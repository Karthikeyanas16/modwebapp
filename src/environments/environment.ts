// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL = 'http://localhost:8765';
export const environment = {
  production: false,
  url: BASE_URL,
  userService: BASE_URL + `/api/user`,
  searchService: BASE_URL + `/api/search`,
  adminService: BASE_URL + `/api/admin`,
  authService: BASE_URL + `/api/auth`,
  enrollmentService: BASE_URL + `/api/enrollment`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
