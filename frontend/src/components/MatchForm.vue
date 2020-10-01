<template>
  <div class="container">
    <h2>Add Match</h2>
    <form @submit.prevent="addMatch" class="form-container">
      <div class="winner1">
        <input type="radio" name="winner" :value="player.username" v-model="match.win" checked required />
      </div>
      <div class="winner">Winner</div>
      <div class="winner2">
        <input type="radio" name="winner" :value="opponent" v-model="match.win" />
      </div>
      <span class="selectp1">{{ player.username }}</span>
      <div class="player1">
        <input type="number" v-model="set.player1_set1_points" class="left-side" placeholder="0" tabindex="1" min="0" />
        <input type="number" v-model="set.player1_set2_points" class="left-side" placeholder="0" tabindex="3" min="0" />
        <input type="number" v-model="set.player1_set3_points" class="left-side" placeholder="0" tabindex="5" min="0" />
        <input type="number" v-model="set.player1_set4_points" class="left-side" placeholder="0" tabindex="7" min="0" />
        <input type="number" v-model="set.player1_set5_points" class="left-side" placeholder="0" tabindex="9" min="0" />
      </div>
      <span class="selectvs">vs</span>
      <div class="vs">
        <span>:</span>
        <span>:</span>
        <span>:</span>
        <span>:</span>
        <span>:</span>
      </div>

      <select class="selectp2" @change="setSelectedOpponent($event)">
        <option v-for="player in playerList" v-bind:value="player" v-bind:key="player">{{ player }}</option>
      </select>
      <div class="player2">
        <input
          type="number"
          v-model="set.player2_set1_points"
          placeholder="0"
          tabindex="2"
          min="0"
          @click="completeSetScore"
          @keyup.tab="completeSetScore"
        />
        <input
          type="number"
          v-model="set.player2_set2_points"
          placeholder="0"
          tabindex="4"
          min="0"
          @click="completeSetScore"
          @keyup.tab="completeSetScore"
        />
        <input
          type="number"
          v-model="set.player2_set3_points"
          placeholder="0"
          tabindex="6"
          min="0"
          @click="completeSetScore"
          @keyup.tab="completeSetScore"
        />
        <input
          type="number"
          v-model="set.player2_set4_points"
          placeholder="0"
          tabindex="8"
          min="0"
          @click="completeSetScore"
          @keyup.tab="completeSetScore"
        />
        <input
          type="number"
          v-model="set.player2_set5_points"
          placeholder="0"
          tabindex="10"
          min="0"
          @click="completeSetScore"
          @keyup.tab="completeSetScore"
        />
      </div>

      <div class="save-button">
        <button>save</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '../store/index.js';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      player: store.state.player,
      opponent: store.state.opponent,
      match: {
        player1: '',
        player2: '',
        date_played: new Date(),
        win: store.state.player.username,
        defeat: '',
        player1_score: 0,
        player2_score: 0,
        player1_total_points: 0,
        player2_total_points: 0,
        set_score: [],
      },
      set: {
        player1_set1_points: '',
        player1_set2_points: '',
        player1_set3_points: '',
        player1_set4_points: '',
        player1_set5_points: '',
        player2_set1_points: '',
        player2_set2_points: '',
        player2_set3_points: '',
        player2_set4_points: '',
        player2_set5_points: '',
      },
    };
  },
  computed: {
    ...mapGetters(['playerList']),
  },
  methods: {
    ...mapActions(['getPlayers', 'setOpponent']),
    setSelectedOpponent(e) {
      const opponent = e.target.value;
      console.log(opponent);
      this.setOpponent(opponent);
    },
    async addMatch() {
      if (this.set.player1_set4_points === '' && this.set.player1_set5_points === '') {
        this.match.set_score = [
          `${this.set.player1_set1_points}:${this.set.player2_set1_points}`,
          `${this.set.player1_set2_points}:${this.set.player2_set2_points}`,
          `${this.set.player1_set3_points}:${this.set.player2_set3_points}`,
        ];
        this.match.player1_total_points =
          +this.set.player1_set1_points + +this.set.player1_set2_points + +this.set.player1_set3_points;
        this.match.player2_total_points =
          +this.set.player2_set1_points + +this.set.player2_set2_points + +this.set.player2_set3_points;
        this.win === this.player.username
          ? ((this.match.player1_score = 3), (this.match.player2_score = 0))
          : ((this.match.player1_score = 0), (this.match.player2_score = 3));
      } else if (this.set.player1_set5_points === '') {
        this.match.set_score = [
          `${this.set.player1_set1_points}:${this.set.player2_set1_points}`,
          `${this.set.player1_set2_points}:${this.set.player2_set2_points}`,
          `${this.set.player1_set3_points}:${this.set.player2_set3_points}`,
          `${this.set.player1_set4_points}:${this.set.player2_set4_points}`,
        ];
        this.match.player1_total_points =
          +this.set.player1_set1_points +
          +this.set.player1_set2_points +
          +this.set.player1_set3_points +
          +this.set.player1_set4_points;
        this.match.player2_total_points =
          +this.set.player2_set1_points +
          +this.set.player2_set2_points +
          +this.set.player2_set3_points +
          +this.set.player2_set4_points;
        this.win === this.player.username
          ? ((this.match.player1_score = 3), (this.match.player2_score = 1))
          : ((this.match.player1_score = 1), (this.match.player2_score = 3));
      } else {
        this.match.set_score = [
          `${this.set.player1_set1_points}:${this.set.player2_set1_points}`,
          `${this.set.player1_set2_points}:${this.set.player2_set2_points}`,
          `${this.set.player1_set3_points}:${this.set.player2_set3_points}`,
          `${this.set.player1_set4_points}:${this.set.player2_set4_points}`,
          `${this.set.player1_set5_points}:${this.set.player2_set5_points}`,
        ];
        this.match.player1_total_points =
          +this.set.player1_set1_points +
          +this.set.player1_set2_points +
          +this.set.player1_set3_points +
          +this.set.player1_set4_points +
          +this.set.player1_set5_points;
        this.match.player2_total_points =
          +this.set.player2_set1_points +
          +this.set.player2_set2_points +
          +this.set.player2_set3_points +
          +this.set.player2_set4_points +
          +this.set.player2_set5_points;
        this.win === this.player.username
          ? ((this.match.player1_score = 3), (this.match.player2_score = 2))
          : ((this.match.player1_score = 2), (this.match.player2_score = 3));
      }
      this.match.player1 = this.player.username;
      this.match.player2 = this.opponent !== '' ? this.opponent : this.playerList[0];
      this.match.win;
      if (this.match.win !== this.player.username) {
        this.match.defeat = this.player.username;
      } else {
        this.match.defeat = this.opponent !== '' ? this.opponent : this.playerList[0];
      }

      console.log(this.match, this.opponent, this.playerList);
      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/v1/matches/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(this.match),
      });

      const data = await response.json();
      console.log(data);
      const redirectUrl = (window.location.href = `${process.env.VUE_APP_URL}/#/table`);
      return redirectUrl;
    },
    completeSetScore() {
      if (
        this.set.player1_set1_points <= 9 &&
        this.set.player1_set1_points !== '' &&
        this.set.player2_set1_points === ''
      ) {
        this.set.player2_set1_points = 11;
      }

      if (
        this.set.player1_set2_points <= 9 &&
        this.set.player1_set2_points !== '' &&
        this.set.player2_set2_points === ''
      ) {
        this.set.player2_set2_points = 11;
      }

      if (
        this.set.player1_set3_points <= 9 &&
        this.set.player1_set3_points !== '' &&
        this.set.player2_set3_points === ''
      ) {
        this.set.player2_set3_points = 11;
      }

      if (
        this.set.player1_set4_points <= 9 &&
        this.set.player1_set4_points !== '' &&
        this.set.player2_set4_points === ''
      ) {
        this.set.player2_set4_points = 11;
      }

      if (
        this.set.player1_set5_points <= 9 &&
        this.set.player1_set5_points !== '' &&
        this.set.player2_set5_points === ''
      ) {
        this.set.player2_set5_points = 11;
      }
    },
  },
  created() {
    this.getPlayers(this.player.username);
    this.setOpponent(this.playerList[0]);
  },
};
</script>

<style>
.form-container {
  /* justify-items: center; */
  justify-content: center;
  padding-top: 10px;
  display: grid;
  gap: 5px;
  height: 100%;
  width: 100%;
  margin: auto;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas:
    'title title title'
    'selectp1 selectvs selectp2'
    'winner1 winner winner2'
    'player1 vs player2'
    'save save save';
}

h2 {
  grid-area: title;
}

.selectp1 {
  grid-area: selectp1;
  margin-bottom: 30px;
}

.selectvs {
  grid-area: selectvs;
  margin-bottom: 30px;
}

.selectp2 {
  grid-area: selectp2;
  margin-bottom: 30px;
}

.player1 {
  margin-top: 10px;
  display: grid;
  justify-items: center;
  gap: 45px;
  grid-auto-flow: row;
  grid-area: player1;
}

.player2 {
  display: grid;
  margin-top: 10px;
  justify-items: center;
  gap: 45px;
  grid-auto-flow: row;
  grid-area: player2;
}

.vs {
  display: grid;
  gap: 45px;
  margin-top: 10px;
  align-items: center;
  grid-auto-flow: row;
  grid-area: vs;
}

.winner1 {
  grid-area: winner1;
  margin-bottom: 15px;
}

.winner {
  grid-area: winner;
  align-self: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.winner2 {
  grid-area: winner2;
  margin-bottom: 15px;
}

.save-button {
  grid-area: save;
  display: grid;
  justify-self: center;
  padding-top: 20px;
  width: 80%;
}

.form-container input[type='number'] {
  border: 2px dotted #2c3e50;
  height: 40px;
  width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #2c3e50;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: -5px;
  font-size: 14px;
  line-height: normal;
  font-weight: 400;
  border: none;
  border-bottom: 1px dotted #2c3e505b;
  width: 100%;
  appearance: none;
  display: block;
  text-align-last: center;
}

::-webkit-input-placeholder {
  opacity: 1;
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
} /* Chrome <=56, Safari < 10 */
:-moz-placeholder {
  opacity: 1;
  -moz-transition: opacity 0.5s;
  transition: opacity 0.5s;
} /* FF 4-18 */
::-moz-placeholder {
  opacity: 1;
  -moz-transition: opacity 0.5s;
  transition: opacity 0.5s;
} /* FF 19-51 */
:-ms-input-placeholder {
  opacity: 1;
  -ms-transition: opacity 0.5s;
  transition: opacity 0.5s;
} /* IE 10+ */
::placeholder {
  opacity: 1;
  transition: opacity 0.5s;
} /* Modern Browsers */

*:focus::-webkit-input-placeholder {
  opacity: 0;
} /* Chrome <=56, Safari < 10 */
*:focus:-moz-placeholder {
  opacity: 0;
} /* FF 4-18 */
*:focus::-moz-placeholder {
  opacity: 0;
} /* FF 19-50 */
*:focus:-ms-input-placeholder {
  opacity: 0;
} /* IE 10+ */
*:focus::placeholder {
  opacity: 0;
} /* Modern Browsers */
</style>
