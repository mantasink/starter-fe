import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: 'http://localhost:8090/api/',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json; charset=utf-8'
  },
  responseType: 'json'
})
