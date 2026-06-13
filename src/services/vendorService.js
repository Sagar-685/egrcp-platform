import vendors from '../mocks/vendors.json'

export const vendorService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 600))
    return vendors
  },
  getById: async (id) => {
    await new Promise(r => setTimeout(r, 400))
    const vendor = vendors.find(v => v.id === id)
    if (!vendor) throw new Error('Vendor not found')
    return vendor
  }
}