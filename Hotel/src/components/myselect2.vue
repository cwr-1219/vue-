<template>
  <div class="form-group_data">
    <label>{{ labelText }}</label>
    <input v-model="inputdate" @input="habdleInputdate" type="date" placeholder="Check-In" class="date" />
  </div>
</template>
<script setup>

import {defineProps,defineEmits} from 'vue'
const props = defineProps({
  labelText: {
      type: String,
      default: 'Data Check-In'
    }
});

const emit = defineEmits(['input-changedate'])

let inputdate = '';

function habdleInputdate() {
  emit('input-changedate', inputdate)
}

</script>
<style>
.date {
  width: 300px;
  height: 80px;
  border: 1px solid #cecece;
}
.form-group_data {
  font-family: serif;
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
}

.form-group_data label {
  width: 100%;
  font-size: 14px;
  margin-bottom: 0.5rem;
}

form .form-group_data input {
  width: auto;
}

/*  */

.date::-webkit-calendar-picker-indicator {
  font-size: 35px; /* 调整按钮大小 */
  color: #cecece;
}
</style>
