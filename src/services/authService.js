import users from '../mocks/users.json'

// Simulated API calls using mock data
export const authService = {
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 800)) // simulate network delay
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password')
    const { password: _, ...safeUser } = user
    return { user: safeUser, token: `mock-token-${user.id}-${Date.now()}` }
  },

  logout: async () => {
    await new Promise(r => setTimeout(r, 300))
    return { success: true }
  }
}