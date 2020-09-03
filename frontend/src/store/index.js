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
    playerList: [],
  },
  getters: {
    playerList: state => state.playerList,
  },
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
    setPlayers(state, player) {
      state.playerList.push(player);
    },
    clearPlayers(state) {
      state.playerList = [];
    },
  },
  actions: {
    setPlayerState({ commit }, username) {
      commit('setPlayerState', username);
    },
    async getPlayers({ commit }, username) {
      const response = await fetch('http://localhost:3001/api/v1/players/', { method: 'GET', credentials: 'include' });
      const data = await response.json();
      const players = data.filter(player => player.username != username);
      await commit('clearPlayers');
      await players.forEach(player => {
        console.log(player);
        commit('setPlayers', player.username);
      });
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
