import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    player: {
      isLoggedIn: false,
      username: '',
      token: '',
    },
  },
  getters: {},
  mutations: {
    setPlayerState(state, username) {
      if (username !== '') {
        state.player.username = username;
        state.player.isLoggedIn = true;
      } else {
        state.player.username = '';
        state.player.isLoggedIn = false;
      }
    },
  },
  actions: {
    setPlayerState({ commit }, username) {
      commit('setPlayerState', username);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
