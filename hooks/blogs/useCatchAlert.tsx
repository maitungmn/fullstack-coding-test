import React from "react"
import { useRouter } from 'next/router'
import { NON_ADMIN } from "constants/index"

export const useCatchAlert = () => {
  const router = useRouter()
  React.useEffect(() => {
    if (router.query.error === NON_ADMIN) {
      alert("Only Admin can access Dashboard!")
    }
  }, [])
}