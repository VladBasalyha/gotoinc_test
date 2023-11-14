<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRequestStore } from '../src/store/store'
import Dialog from '../src/components/DialogWindow.vue'
const requestStore = useRequestStore()

// const requests = ref([])
const showDialog = ref(null)

const cancel = () => {
  showDialog.value = null
}

function fetchRequests() {
  requestStore.setRequests(JSON.parse(localStorage.getItem('requests')) || [])
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
function confirm() {
  requestStore.removeRequest(showDialog.value)

  showDialog.value = null
  localStorage.setItem('requests', JSON.stringify(requestStore.requests))
}

// restrict user to choose a date in the past or today
const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

  // Check if any required field is empty
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

  // Check if the dispatch date is in the past
  // restrict to choose a past date even if user changed values in devtools
  const currentDate = new Date()
  const selectedDate = new Date(requestData.dispatchDate)

  if (selectedDate < currentDate) {
    alert('Please choose a date in the future')
    return
  }

  // Add the request to the store and update local storage
  requestStore.addRequest(requestData)
  localStorage.setItem('requests', JSON.stringify(requestStore.requests))

  console.log(requestStore.requests)
}
</script>

<template>
  <div class="p-4">
    <form @submit.prevent="onSubmit" class="max-w-md mx-auto bg-gray-100 p-8 rounded shadow-md">
      <div class="mb-4">
        <label for="origin-city" class="text-sm font-medium text-gray-700">From:</label>
        <input
          type="text"
          class="p-2 mt-1 block w-full border-2 border-gray-200 rounded-md outline-none"
          id="origin-city"
          v-model="request.originCity"
        />
      </div>
      <div class="mb-4">
        <label for="destination-city" class="text-sm font-medium text-gray-700">To:</label>
        <input
          type="text"
          class="p-2 mt-1 block w-full border-2 border-gray-200 rounded-md outline-none"
          id="destination-city"
          v-model="request.destinationCity"
        />
      </div>
      <div class="mb-4">
        <label for="parcel-type" class="text-sm font-medium text-gray-700">Type of parcel:</label>
        <select
          class="form-input p-2 rounded-md mt-1 block w-full border-2 border-gray-200 rounded-mdt-1 outline-none"
          id="parcel-type"
          v-model="request.parcelType"
        >
          <option value="gadgets">Gadgets</option>
          <option value="drinks">Drinks</option>
          <option value="clothes">Clothes</option>
          <option value="medicines">Medicines</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="dispatch-date" class="text-sm font-medium p-4 text-gray-700"
          >Date of dispatch:</label
        >
        <input
          type="date"
          class="form-input mt-1 block w-full outline-none p-2 rounded-md border-2 border-gray-200"
          :min="getCurrentDate()"
          v-model="request.dispatchDate"
          placeholder="choose"
        />
      </div>
      <div class="mb-4">
        <label for="parcel-description" class="text-sm font-medium text-gray-700"
          >Parcel description:</label
        >
        <textarea
          class="form-textarea mt-1 block w-full border-2 border-gray-200 rounded-md p-2"
          id="parcel-description"
          rows="3"
          v-model="request.parcelDescription"
        ></textarea>
      </div>

      <button
        type="submit"
        class="block w-full bg-blue-500 text-white m-auto rounded px-4 py-2 hover:bg-blue-700"
      >
        Submit
      </button>
    </form>

    <h1 class="text-2xl font-bold text-white mt-8 text-center font-extrabold uppercase">
      All requests
    </h1>
    <ul class="text-white sm:grid-cols-1 grid gap-4 md:grid-cols-2 justify-items-center">
      <li
        v-for="request in requestStore.requests"
        :key="request.id"
        class="py-4 flex justify-center"
      >
        <div class="bg-gray-800 p-4 rounded-md shadow-md">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-2"><strong>From:</strong> {{ request.originCity }}</div>
            <div class="mb-2"><strong>To:</strong> {{ request.destinationCity }}</div>
            <div class="mb-2"><strong>Type:</strong> {{ request.parcelType }}</div>

            <div class="mb-2"><strong>Date:</strong> {{ request.dispatchDate }}</div>
            <div class="col-span-full mb-2">
              <strong>Description:</strong> {{ request.parcelDescription }}
            </div>
            <div class="col-span-full m-auto">
              <button
                @click="showDialog = request.id"
                class="btn bg-red-500 text-white px-2 py-1 hover:bg-red-700"
              >
                Delete request
              </button>
              <Teleport to="body">
                <Dialog
                  v-if="showDialog !== null && showDialog === request.id"
                  :show="showDialog === request.id"
                  :cancel="cancel"
                  :confirm="confirm"
                  title="Delete request?"
                  description="Are you sure you want to delete this task?"
                />
              </Teleport>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
