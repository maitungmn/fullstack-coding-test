import React from "react";
import { blogsCol } from "@fb/launcher";
import { IBlogState } from "../../pages/dashboard";

export const useFetchOnce = (setBlogs: React.Dispatch<React.SetStateAction<IBlogState[]>>) => {
  React.useEffect(() => {
    (async () => {
      const blogsSnapshot = await blogsCol.get();
      const docs = blogsSnapshot.docs;
      const blogs = docs.map(i => {
        return {
          ...i.data(),
          id: i.id,
        };
      });
      setBlogs(blogs as IBlogState[]);
    })();
  }, []);
};

