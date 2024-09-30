<script setup>
import { reactive } from 'vue'
import Thermometer from '../thermometer.js'

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
        {"time": "2012-04-23T18:25:53.511Z", "temperature": "-2.0"}
    ]
};
let therm_thresholds = [
    {temperature: 13.0, preference: "both", notification_leeway: 0}
];
let thermometer = reactive(new Thermometer(JSON.stringify(initial_data), therm_thresholds));

console.log(thermometer)

function update(){
    thermometer.updateTemperatures();
}
// export default {
//     name:
// }
</script>

<template>

  <div class="thermometer">
    Current temperature is: {{thermometer.current_temperature}}
  </div>

  <button @click="update">
    Update temperature
  </button>

</template>

<style scoped>

</style>
