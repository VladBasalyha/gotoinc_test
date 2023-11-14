<template>
  <div>
    <form @submit.prevent="$emit('submit')">
      <div v-for="inputValue in inputValues" v-bind:key="inputValue.label">
        <label :for="inputValue.id">{{ inputValue.label }}</label>
        <input :id="inputValue.id" :type="inputValue.type" :placeholder="inputValue.placeholder" />
      </div>
      <select name="parcelTypes">
        <option v-for="optionValue in optionValues" v-bind:key="optionValue" :value="optionValue">
          {{ optionValue }}
        </option>
      </select>
      <br />
      <textarea name="parcelDescription" id="" cols="30" rows="10"></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>

  <!-- <form @submit.prevent="onSubmit">
    <div v-for="inputValue in inputValues" v-bind:key="inputValue.id" class="form-group">
      <label :for="inputValue.id">{{ inputValue.label }}</label>

      <input
        :type="inputValue.type"
        class="form-control"
        :id="inputValue.id"
        :required="inputValue.required"
        :placeholder="inputValue.placeholder"
      />
    </div>
    <div class="form-group">
      <label for="parcel-description">Parcel description:</label>
      <textarea class="form-control" id="parcel-description" rows="3"></textarea>
    </div>
  </form>
  <button type="submit" class="btn btn-primary">Submit</button> -->
</template>

<script setup>
import { defineEmits } from 'vue'
defineProps({
  originCity: String,
  destinationCity: String,
  parcelType: String,
  dispatchDate: String,
  parcelDescription: String
})

defineEmits(['submit'])
let optionValues = ['gadgets', 'drinks', 'clothes', 'medicines', 'other']

let inputValues = [
  {
    type: 'text',
    id: 'origin-city',
    label: 'From:',
    required: true,
    placeholder: 'City of origin'
  },
  {
    type: 'text',
    id: 'destination-city',
    label: 'To:',
    required: true,
    placeholder: 'City of destination'
  },
  {
    type: 'date',
    id: 'dispatch-date',
    label: 'Date of dispatch:',
    required: true,
    placeholder: 'Date of dispatch'
  }
]
</script>
