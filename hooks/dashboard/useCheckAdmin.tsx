import React from "react"
import Router from "next/router";
import { NON_ADMIN } from "constants/index";

export const useCheckAdmin = (userRole: string) => {

  React.useEffect(() => {
    if (userRole !== "admin") {
      Router.push(`/blog?error=${NON_ADMIN}`)
    }
  }, []);
}