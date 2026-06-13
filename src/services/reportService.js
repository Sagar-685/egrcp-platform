import reports from '../mocks/reports.json'

export const reportService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 500))
    return reports
  },
  generate: async (type) => {
    await new Promise(r => setTimeout(r, 1200))
    return {
      id: `RPT${Date.now()}`,
      name: `${type} Report - ${new Date().toLocaleDateString()}`,
      type,
      generatedBy: 'Current User',
      createdAt: new Date().toISOString(),
      status: 'Ready'
    }
  }
}