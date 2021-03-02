import { IBlogState } from "pages/blog"
import React from "react"

export const useCheckCreateUpdate = (blogContent: IBlogState = null) => {
  const [isCreate, setIsCreate] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (blogContent && Object.entries(blogContent).length) {
      setIsCreate(false)
    }
  }, [blogContent])

  return [isCreate]
}