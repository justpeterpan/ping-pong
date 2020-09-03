<template>
  <div class="container">
    <h2>Add Match</h2>
    <form action="" class="form-container">
      <span class="selectp1">{{ player.username }}</span>
      <div class="player1">
        <input type="number" class="left-side" tabindex="1" />
        <input type="number" class="left-side" tabindex="3" />
        <input type="number" class="left-side" tabindex="5" />
      </div>
      <span class="selectvs">vs</span>
      <div class="vs">
        <span>:</span>
        <span>:</span>
        <span>:</span>
      </div>
      <select class="selectp2">
        <option v-for="player in playerList" v-bind:value="player" v-bind:key="player">{{ player }}</option>
      </select>
      <div class="player2">
        <input type="number" tabindex="2" />
        <input type="number" tabindex="4" />
        <input type="number" tabindex="6" />
      </div>
      <button class="save-button">save</button>
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
    };
  },
  computed: {
    ...mapGetters(['playerList']),
  },
  methods: {
    ...mapActions(['getPlayers']),
  },
  created() {
    this.getPlayers(this.player.username);
    console.log(this.playerList);
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
  width: 100%;
  margin: auto;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas:
    'title title title'
    'selectp1 selectvs selectp2'
    'player1 vs player2'
    'save save save';
}

h2 {
  grid-area: title;
}

.selectp1 {
  grid-area: selectp1;
}

.selectvs {
  grid-area: selectvs;
}

.selectp2 {
  grid-area: selectp2;
}

.player1 {
  margin-top: 10px;
  display: grid;
  justify-items: center;
  gap: 5px;
  grid-auto-flow: row;
  grid-area: player1;
}

.player2 {
  display: grid;
  margin-top: 10px;
  justify-items: center;
  gap: 5px;
  grid-auto-flow: row;
  grid-area: player2;
}
.vs {
  display: grid;
  margin-top: 10px;
  align-items: center;
  grid-auto-flow: row;
  grid-area: vs;
}
.save-button {
  grid-area: save;
}

.form-container input {
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
  max-width: 100%;
  appearance: none;
  display: block;
  text-align-last: center;
}
</style>
