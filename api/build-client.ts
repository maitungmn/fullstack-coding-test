import axios from "axios"

export const buildClient = (headers) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_LAMBDA_ENDPOINT,
    headers
  })
}