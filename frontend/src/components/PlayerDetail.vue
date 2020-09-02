<template>
  <div class="container">
    <h2>{{ player.username }}</h2>
    <div>
      <ul class="stats">
        <li>🏓 matches: {{ stats.matches }}</li>
        <li>🏅 wins: {{ stats.wins }}</li>
        <li>😔 defeats: {{ stats.defeats }}</li>
        <li>🎯 points: {{ stats.points }}</li>
      </ul>
    </div>
    <MatchList :id="`${id}`" />
  </div>
</template>

<script>
import { ref } from 'vue';
import MatchList from './MatchList';

export default {
  props: ['id'],
  components: {
    MatchList,
  },
  setup(props) {
    const player = ref([]);
    const stats = ref([]);
    const API_URL = 'http://localhost:3001/api/v1/players';

    const getPlayer = async id => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          credentials: 'include',
        });
        const json = await response.json();
        player.value = json;
      } catch (e) {
        error => console.log(error);
      }
    };

    const getPlayerStats = async id => {
      const response = await fetch(`${API_URL}/${id}/stats`, {
        credentials: 'include',
      });
      const json = await response.json();
      stats.value = json;
    };

    getPlayer(props.id);
    getPlayerStats(props.id);

    return {
      player,
      stats,
    };
  },
};
</script>

<style>
.header {
  text-align: left;
  margin-top: 10px;
}

.stats {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 2;
  list-style: none;
  text-align: left;
  font-weight: 100;
}
</style>
