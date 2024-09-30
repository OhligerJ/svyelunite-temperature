<script setup>
import { ref } from 'vue'
import Thermometer from '../Thermometer.js'

defineProps({
  temperature_data: String,
  thresholds: String,
})

</script>

<template>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
