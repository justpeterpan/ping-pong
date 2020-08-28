<template>
  <div class="container">
    <h2>Match</h2>
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
import { ref } from "vue";

export default {
  props: ["id"],

  setup(props) {
    const match = ref([]);
    const API_URL = "http://localhost:3001/api/v1/matches";

    const getMatchDetails = async id => {
      const response = await fetch(`${API_URL}/${id}`);
      const json = await response.json();
      match.value = json;
    };

    getMatchDetails(props.id);

    return {
      match
    };
  }
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
