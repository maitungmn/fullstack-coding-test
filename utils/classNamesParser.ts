export const classNamesParser = (classNames: string[], styles: any) => {
  return classNames.reduce((finalClasses: string, eachItem: string, index: number) => {
    if (styles[eachItem]) {
      finalClasses += " " + styles[eachItem];
    }

    return finalClasses;
  }, "");
};
