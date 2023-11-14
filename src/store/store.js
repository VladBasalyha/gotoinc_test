import { defineStore } from 'pinia'

export const useRequestStore = defineStore('request', {
  state: () => ({
    requests: []
  }),
  actions: {
    setRequests(newRequests) {
      this.requests = newRequests
    },
    addRequest(newRequest) {
      this.requests.push(newRequest)
    },
    removeRequest(requestId) {
      this.requests = this.requests.filter((request) => request.id !== requestId)
    }
  }
})
