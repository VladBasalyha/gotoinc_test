<template>
  <div v-show="show" class="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-10">
    <div>
      <div>
        <h2 v-text="title"></h2>
        <p class="dialog__description" v-text="description"></p>
      </div>

      <hr />

      <div class="dialog__footer">
        <button @click="cancel">Cancel</button>
        <button @click="confirm">Yes, delete it</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  show: Boolean,
  title: String,
  description: String,
  cancel: String,
  confirm: String
})
</script>
