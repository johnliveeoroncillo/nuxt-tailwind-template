import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({ store, req }) => {
  createPersistedState({
    key: 'vuex-posv4',
    paths: ['auth.loggedIn', 'auth.strategy', 'auth.user'],
    storage: {
      getItem: (key) => {
        const store = window.localStorage.getItem(key);
        if (store) {
          try {
            return JSON.parse(store);
          } catch (e) {
            window.localStorage.removeItem(key);
          }
        }
  
        return null;
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
          return window.localStorage.setItem(key, value);
      },
      removeItem: (key) => {
          Cookies.remove(key)
          window.localStorage.removeItem(key);
      }
    },
  })(store)
}