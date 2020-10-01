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
    opponent: '',
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
    setOpponent(state, opponent) {
      state.opponent = opponent;
    },
  },
  actions: {
    setPlayerState({ commit }, username) {
      commit('setPlayerState', username);
    },
    async getPlayers({ commit }, username) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/v1/players/`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      const players = data.filter(player => player.username != username);
      await commit('clearPlayers');
      await players.forEach(player => {
        commit('setPlayers', player.username);
      });
    },
    setOpponent({ commit }, opponent) {
      commit('setOpponent', opponent);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
