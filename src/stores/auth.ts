import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  function setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue: any) {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  async function checkToken() {
    try {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token.value
      const { data } = await api.get('/login/verificar')
      return data
    } catch (error) {
      delete api.defaults.headers.common['Authorization']
      console.log(error as Error)
    }
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value
  })

  const getUser = computed(() => {
    if (user.value) {
      return user.value
    }
    return ''
  })

  function clear() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = ''
    user.value = ''
    delete api.defaults.headers.common['Authorization']
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    getUser,
    clear
  }
})
