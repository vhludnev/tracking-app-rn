import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiURL } from "@env"

// export default axios.create({
//   baseURL: apiURL,
// })

const instance = axios.create({
  baseURL: apiURL,
})

// automating authentication
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance