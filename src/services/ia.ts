import axios from 'axios'

const ia = axios.create({
  baseURL: 'http://localhost:8000'
})

export default ia
