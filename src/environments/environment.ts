// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  url: 'http://localhost:4500/api/',
  production: false,
  public_api_key: '405opg1kfvo5ie1',

  bucket: {
    user: '5f70766c3c717f1a0b8a4ab6/',
    social_media: '5f8df21a85c7865453fafc87/',
    connection: '5f8df29b85c7864751fafc89/',
    favorites: '5f8df36385c786f39ffafc8b/',
  },

  function: {
    check_username: 'checkUsername',
    post_username: 'postUsername',
    add_new_connection: 'addNewConnection',
    edit_connection: 'editConnection',
    delete_connection: 'deleteConnection',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
