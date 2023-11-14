<script setup>
import FormField from './components/FormField.vue'
import { ref } from 'vue'
// const onSubmit = () => {
//   console.log(request.value.originCity)
// }
import { v4 as uuidv4 } from 'uuid'
// import Dialog from '../src/components/DialogWindow.vue'
// import FormField from './components/FormField.vue'
const requests = ref([])

// const showDialog = ref(null)

// const cancel = () => {
//   showDialog.value = null
// }

// async function fetchRequests() {
//   const existingRequests = JSON.parse(localStorage.getItem('requests')) || []
//   requests.value = existingRequests
// }

// fetchRequests()

const request = ref({
  originCity: '',
  destinationCity: '',
  parcelType: '',
  dispatchDate: '',
  parcelDescription: ''
})

// // Delete the request
// const confirm = () => {
//   requests.value = requests.value.filter((request) => request.id !== showDialog.value)

//   showDialog.value = null
//   localStorage.setItem('requests', JSON.stringify(requests.value))
// }

function onSubmit() {
  const requestData = {
    id: uuidv4(),
    originCity: request.value.originCity,
    destinationCity: request.value.destinationCity,
    parcelType: request.value.parcelType,
    dispatchDate: request.value.dispatchDate,
    parcelDescription: request.value.parcelDescription
  }

  // Push the new request to the requests ref
  requests.value.push(requestData)

  // Save the updated requests array to local storage
  localStorage.setItem('requests', JSON.stringify(requests.value))

  // Fetch all requests from local storage
  // await fetchRequests()
  console.log(requests.value)
}
</script>

<template>
  <FormField @submit="onSubmit"></FormField>
  <!-- <FormField @submit="onSubmit" />
  <div>
    <h1>All requests</h1>
    <ul>
      <li v-for="request in requests" :key="request.id">
        <ul>
          <li>
            From:{{ request.originCity }}

            <button @click="showDialog = request.id" class="btn">Delete Task</button>
            <Teleport to="body">
              <Dialog
                v-if="showDialog !== null && showDialog === request.id"
                :show="showDialog === request.id"
                :cancel="cancel"
                :confirm="confirm"
                title="Delete a task?"
                description="Are you sure you want to delete this task?"
              />
            </Teleport>


  </li>
          <li>To:{{ request.destinationCity }}</li>
          <li>Type:({{ request.parcelType }})</li>
          <li>Date:{{ request.dispatchDate }}</li>
          <li>{{ request.parcelDescription }}</li>
        </ul>
      </li>
    </ul> -->
  <!-- </div>  -->
</template>
