<script setup>
import { reactive, onMounted } from 'vue'
import Thermometer from '../thermometer.js'

let timeout_multiplier = 500; // update temperature every 0.5 seconds

let therm_data = {
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
        {"time": "2012-04-23T18:25:53.511Z", "temperature": "-2.0"},
        {"time": "2012-04-23T18:25:54.511Z", "temperature": "-98.0"},
        {"time": "2012-04-23T18:25:55.511Z", "temperature": "1.0"},
    ]
};

/*
    Options for preference: both, rising_to, falling_to
*/
let therm_thresholds = [
    {temperature: 13.0, preference: "both", notification_leeway: 0},
    {temperature: 0.0, preference: "rising_to", notification_leeway: 0.5},
];

let thermometer = reactive(new Thermometer(JSON.stringify(therm_data), therm_thresholds));

let temp_list = reactive([])

onMounted(() => {
    for(let i = 0; i < thermometer.temperature_data.data.length; i++) {
        if(i == 0){
            temp_list[i] = thermometer.temperature_data.data[i]
        } else {
            setTimeout( () => {
                thermometer.updateTemperatures()

                let msg = ''
                if(thermometer.crossedThreshold() != null){
                    msg = thermometer.thresholdMessage(thermometer.crossedThreshold())
                }
                temp_list[i] = {
                    temperature: thermometer.temperature_data.data[i].temperature,
                    time: thermometer.temperature_data.data[i].time,
                    message: msg
                }
            }, timeout_multiplier*i)
            
        }
    }
})

</script>

<template>

  <div class="thermometer_body">
    <Transition>
    <div class="times">
        <div class="current_temp">
            <p>The temperature is: {{ thermometer.current_temperature }} {{ thermometer.temperature_language }}</p>
            <p class="current_datetime">at: {{ thermometer.current_datetime }}</p>
        </div>
        <div :key="index" v-for = "measurement, index in temp_list">
            <div class="measurement">
                <div v-if = "measurement.message" class="threshold_message"> {{ measurement.message }} at {{ measurement.time }}</div>
            </div>
        </div>
    </div>
    </Transition>
  </div>

</template>

<style scoped>
    div.thermometer_body {
        margin-top: 20px;
        padding-left: 50px;
        padding-right: 50px;
        width:60vw;
        div.times {
            border: #000 1px solid;
            padding: 5px;
            div.current_temp {
                font-size: 36px;
                font-weight: bold;
                margin: 20px;
                p {
                    margin: 5px;
                }
                p.current_datetime {
                    font-size: 28px;
                }
            }
            div.measurement{
                margin-bottom: 15px;
                div.threshold_message {
                    margin-top: 10px;
                    margin-left: auto;
                    margin-right: auto;
                    font-size: 20px;
                    border: red 3px solid;
                    font-weight: bold;
                    padding: 3px;
                    max-width: 800px;
                }
            }
        }
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
