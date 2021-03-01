import React from "react";
import { blogsCol } from "@fb/launcher";
import { IBlogState } from "pages/blog";

export const useObserver = () => {

  const [blogs, setBlogs] = React.useState<IBlogState[]>([]);

  React.useEffect(() => {
    const observer = blogsCol.onSnapshot(
      querySnapshot => {
        const blogs = querySnapshot.docs.map(i => (
          {
            ...i.data(),
            id: i.id,
          }
        ));
        setBlogs(blogs as IBlogState[]);
      },
      err => {
        console.error(`Encountered error: ${err}`);
      },
    );

    return observer;
  }, []);

  return [blogs];
};
