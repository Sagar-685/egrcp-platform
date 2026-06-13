import requests from '../mocks/requests.json'

export const procurementService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 600))
    return requests
  },
  getById: async (id) => {
    await new Promise(r => setTimeout(r, 400))
    const req = requests.find(r => r.id === id)
    if (!req) throw new Error('Request not found')
    return req
  },
  create: async (data) => {
    await new Promise(r => setTimeout(r, 800))
    return { ...data, id: `PR${Date.now()}`, createdAt: new Date().toISOString(), status: 'Pending' }
  },
  updateStatus: async (id, status) => {
    await new Promise(r => setTimeout(r, 500))
    return { id, status, updatedAt: new Date().toISOString() }
  }
}