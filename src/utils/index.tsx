import * as Axios from 'axios'

export const axios = Axios.default.create({baseURL: 'http://119.29.220.216:8000/v1'})