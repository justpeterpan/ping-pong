<template>
  <div class="container">
    <h2>Current Ranking</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Pos</th>
          <th scope="col">Player</th>
          <th scope="col">T</th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">Points</th>
        </tr>
      </thead>
      <tbody v-for="(position, index) in table" :key="position" v>
        <tr>
          <th scope="row">{{ index + 1 }}.</th>
          <td>
            <router-link :to="{ name: 'player', params: { id: position.username } }">{{
              position.username
            }}</router-link>
          </td>
          <td>{{ +position.win + +position.defeat }}</td>
          <td>{{ position.win }}</td>
          <td>{{ position.defeat }}</td>
          <td>{{ +position.win * 2 }}:{{ +position.defeat * 2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const table = ref([]);
    const API_URL = `${process.env.VUE_APP_API_URL}/api/v1/players/table`;
    const { _actions } = useStore();

    async function getMatches() {
      try {
        const response = await fetch(API_URL, { credentials: 'include' });
        if (response.statusText === 'Unauthorized' && response.status === 401) {
          _actions.setPlayerState[0]('');
        }
        const json = await response.json();
        table.value = json;
      } catch (e) {
        error => console.log(error);
      }
    }

    getMatches();

    return {
      table,
    };
  },
};
</script>

<style>
h2 {
  border-bottom: 1px dotted lightgray;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

table {
  letter-spacing: 1px;
}

td,
th {
  padding: 0px 12px 0px 0px;
}

th {
  text-align: left;
}

tbody tr th {
  text-align: right;
}

td {
  text-align: right;
}

td a {
  text-decoration: underline;
  text-decoration-style: dotted;
}
</style>
