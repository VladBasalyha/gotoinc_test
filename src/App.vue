<script setup>
import Dialog from '../src/components/DialogWindow.vue'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

const requests = ref([])

const showDialog = ref(null)

const cancel = () => {
  showDialog.value = null
}

async function fetchRequests() {
  const existingRequests = JSON.parse(localStorage.getItem('requests')) || []
  requests.value = existingRequests
}

fetchRequests()

const request = ref({
  originCity: '',
  destinationCity: '',
  parcelType: '',
  dispatchDate: '',
  parcelDescription: ''
})

// Delete the request
const confirm = () => {
  requests.value = requests.value.filter((request) => request.id !== showDialog.value)

  showDialog.value = null
  localStorage.setItem('requests', JSON.stringify(requests.value))
}

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
  if (
    !requestData.originCity ||
    !requestData.destinationCity ||
    !requestData.parcelType ||
    !requestData.dispatchDate ||
    !requestData.parcelDescription
  ) {
    alert('All fields are required')
    return
  }
  requests.value.push(requestData)

  // Save the updated requests array to local storage
  localStorage.setItem('requests', JSON.stringify(requests.value))

  // Fetch all requests from local storage
  // await fetchRequests()
  console.log(requests.value)
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="origin-city">From:</label>
        <input type="text" class="form-control" id="origin-city" v-model="request.originCity" />
      </div>
      <div class="form-group">
        <label for="destination-city">To:</label>
        <input
          type="text"
          class="form-control"
          id="destination-city"
          v-model="request.destinationCity"
        />
      </div>
      <div class="form-group">
        <label for="parcel-type">Type of parcel:</label>
        <select class="form-control" id="parcel-type" v-model="request.parcelType">
          <option value="gadgets">Gadgets</option>
          <option value="drinks">Drinks</option>
          <option value="clothes">Clothes</option>
          <option value="medicines">Medicines</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dispatch-date">Date of dispatch:</label>
        <input type="date" class="form-control" id="dispatch-date" v-model="request.dispatchDate" />
      </div>
      <div class="form-group">
        <label for="parcel-description">Parcel description:</label>
        <textarea
          class="form-control"
          id="parcel-description"
          rows="3"
          v-model="request.parcelDescription"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
    </ul>
  </div>
</template>
