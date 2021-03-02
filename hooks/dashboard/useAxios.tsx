import React from "react"
import { parseCookies } from 'nookies'

import { buildClient } from "../../api/build-client"
import { AxiosInstance } from "axios"

export const useAxios = () => {
  const [axiosClient, setAxiosClient] = React.useState<AxiosInstance | null>(null)

  React.useEffect(() => {
    const cookies = parseCookies()
    if (cookies.token) {
      alert("Missing admin token!")
    } else {
      const axiosClient = buildClient({ Authorization: `Bearer ${cookies.token}` })
      setAxiosClient(axiosClient)
    }
  }, [])

  return [axiosClient]
}