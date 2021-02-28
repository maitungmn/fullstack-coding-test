import React from "react";
import { blogsCol } from "@fb/launcher";
import { IBlogState } from "../../pages/dashboard";

export const useObserver = (setBlogs: React.Dispatch<React.SetStateAction<IBlogState[]>>) => {
  const [observer, setObserver] = React.useState<() => void>(null);

  React.useEffect(() => {
    (() => {
      let firstTime: number = 0;
      const observer = blogsCol.onSnapshot(
        querySnapshot => {
          ++firstTime;
          querySnapshot.docChanges().forEach(change => {
            if (firstTime != 1) {
              console.log("change.doc.id", change.doc.id);
              console.log("change.type", change.type);
              console.log("change.doc.data()", change.doc.data());
              // const cateObj = {
              //   id: change.doc.id,
              //   type: change.type,
              //   ...change.doc.data()
              // };
              // setBlogs()
              // commit("setCateModifiedOnSnapshot", cateObj);
            }
          });
        },
        err => {
          console.error(`Encountered error: ${err}`);
        },
      );
      setObserver(observer);
    })();
  }, [observer]);
};
