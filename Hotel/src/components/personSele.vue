<template>
  <div class="form-group_per">
    <label>{{ per_text }} </label>
    <input v-model="inputbooktele" @input="handleInput" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  per_text: {
    type: String,
    default: 'Person'
  }
});

const emit = defineEmits(['input-change']);

let inputbooktele = '';

function handleInput() {
  emit('input-change', inputbooktele);
}
</script>
<style>
.form-group_per {
  font-family: serif;
  text-align: center;
  width: 270px;
  height: 80px;
}
.form-group_per label {
  width: 100%;
  height: 26%;
}
.form-group_per input {
  width: 100%;
  height: 100%;
}

input[type='number'] {
  line-height: 27px;
  border: 1px solid #cecece;
}

input[type='number']::-webkit-inner-spin-button {
  display: none;
}
</style>
