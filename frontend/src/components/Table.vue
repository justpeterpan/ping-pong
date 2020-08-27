<template>
  <div class="container">
    Current Ranking
    <div class="table">
      <div v-for="(match, index) in matches" :key="match" class="table_entry">
        <!-- {{ match.id }} -
        <router-link
          :to="{ name: 'player', params: { id: match['player1_id'] } }"
          >{{ match["player_1"] }}</router-link
        >
        vs
        <router-link
          :to="{ name: 'player', params: { id: match['player2_id'] } }"
          >{{ match["player_2"] }}:</router-link
        >
        {{ match.score }} -->

        {{ index + 1 }}.
        <router-link :to="{ name: 'player', params: { id: match.id } }">{{
          match.username
        }}</router-link>
        - wins: {{ match.win }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const matches = ref([]);
    const API_URL = "http://localhost:3001/api/v1/matches/stats";

    async function getMatches() {
      const response = await fetch(API_URL);
      const json = await response.json();
      matches.value = json;
    }

    getMatches();

    return {
      matches
    };
  }
};
</script>

<style>
.container {
  text-align: left;
  margin: 20px;
}

.table {
  margin-top: 10px;
}

.table_entry {
  text-align: left;
  font-weight: 100;
}
</style>
