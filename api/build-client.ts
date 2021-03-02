import axios from 'axios';

export const buildClient = (headers) => axios.create({
  baseURL: process.env.NEXT_PUBLIC_LAMBDA_ENDPOINT,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...headers,
  },
})