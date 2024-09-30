<script setup>
import { ref } from 'vue'

defineProps({
  thermometer_obj: Object,
})

// export default {
//     name:
// }
</script>

<template>

  <div class="thermometer">
    Current temperature is: {{this.$props.thermometer_obj.current_temperature}}
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
