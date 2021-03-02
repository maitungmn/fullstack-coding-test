import React from "react"
import { parseCookies } from 'nookies'

export const useToken = () => {
  const [token, setToken] = React.useState<string>("")

  React.useEffect(() => {
    const cookies = parseCookies()
    if (cookies.token) {
      setToken(cookies.token)
    }

  }, [])

  return [token]
}