// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  host_url: 'http://localhost:4200/',
  url: 'http://localhost:4500/api/',
  production: false,
  public_api_key: '405opg1kfvo5ie1',

  bucket: {
    user: '60fdd94175aa6f002c4ad10f',
    socialMedia: '60fddb9875aa6f002c4ad111',
    connection: '60fddcb775aa6f002c4ad114',
    favorites: '60fde27b75aa6f002c4ad123',
    verifiedUser: "60fdddc875aa6f002c4ad116",
    configurations: '60fde12575aa6f002c4ad120',
  },

  function: {
    check_username: 'checkUsername',
    post_username: 'postUsername',
    add_new_connection: 'addNewConnection',
    edit_connection: 'editConnection',
    delete_connection: 'deleteConnection',
    upload_photo: 'uploadPhoto',
    update_user: 'updateUser',
    delete_account: 'deleteUser',
    check_favorite_relation: 'checkFavoriteRelation',
    add_to_favorites: 'addToFavorites',
    delete_from_favorites: 'deleteFromFavorites',
    get_favorites: 'getFavorites',
    search_user: 'search',
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
