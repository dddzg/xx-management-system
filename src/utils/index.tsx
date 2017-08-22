import * as Axios from 'axios'

export const axios = Axios.default.create({baseURL: 'http://localhost:8000/v1'})