<script setup>
import Thermometer from './components/Thermometer.vue'
import ThermometerClass from './thermometer.js'

let initial_data = {
    "units": "Celsius",
    "data": [
        {"time": "2012-04-23T18:25:43.511Z", "temperature": "14.0"},
        {"time": "2012-04-23T18:25:44.511Z", "temperature": "-2.0"},
        {"time": "2012-04-23T18:25:45.511Z", "temperature": "0.0"},
        {"time": "2012-04-23T18:25:46.511Z", "temperature": "0.5"},
        {"time": "2012-04-23T18:25:47.511Z", "temperature": "22.0"},
        {"time": "2012-04-23T18:25:48.511Z", "temperature": "44.0"},
        {"time": "2012-04-23T18:25:49.511Z", "temperature": "99.0"},
        {"time": "2012-04-23T18:25:50.511Z", "temperature": "100.0"},
        {"time": "2012-04-23T18:25:51.511Z", "temperature": "102.0"},
        {"time": "2012-04-23T18:25:52.511Z", "temperature": "98.0"},
        {"time": "2012-04-23T18:25:52.511Z", "temperature": "-2.0"}
    ]
};
let therm_thresholds = [
    {temperature: 13.0, preference: "both", notification_leeway: 0}
];
let thermometer = new ThermometerClass(JSON.stringify(initial_data), therm_thresholds);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <Thermometer :thermometer_obj='thermometer' />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
