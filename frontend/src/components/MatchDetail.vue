<template>
  <div class="container">
    <h2>{{ match.player1 }} vs {{ match.player2 }}</h2>
    <div>
      <ul class="stats">
        <li>📅 Date: {{ match.date_played }}</li>
        <li>🏆 Score: {{ match.score }}</li>
        <li>🎯 Points Played: {{ match.total_points }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['id'],

  setup(props) {
    const match = ref([]);
    const API_URL = `${process.env.VUE_APP_API_URL}/api/v1/matches`;

    const getMatchDetails = async id => {
      const response = await fetch(`${API_URL}/${id}`, {
        credentials: 'include',
      });
      const json = await response.json();
      match.value = json;
    };

    getMatchDetails(props.id);

    return {
      match,
    };
  },
};
</script>

<style>
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
