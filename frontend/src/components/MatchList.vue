<template>
  <div>
    <h2>Last 5 matches</h2>
    <ul class="match-list">
      <li v-for="(match, index) in matches" :key="match">
        <router-link :to="{ name: 'match', params: { id: match.id } }">
          {{ index + 1 }} > {{ match.score }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["id"],

  setup(props) {
    const matches = ref([]);
    const API_URL = "http://localhost:3001/api/v1/players";

    const getPlayerMatches = async id => {
      const response = await fetch(`${API_URL}/${id}/matches`);
      const json = await response.json();
      matches.value = json;
    };

    getPlayerMatches(props.id);

    return {
      matches
    };
  }
};
</script>

<style>
.match-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 2;
  list-style: none;
  text-align: center;
  font-weight: 100;
}
</style>
