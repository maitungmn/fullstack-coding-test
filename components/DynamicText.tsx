import React from "react";
import { Heading } from "@chakra-ui/react";

export interface IRefObject {
  changeValue: (newValue: string) => void
}

const defaultText = "Random Text";

const DynamicText = React.forwardRef((props, ref) => {
  React.useImperativeHandle<unknown, IRefObject>(ref,
    () => ({
      changeValue,
    }),
  );
  const [value, setValue] = React.useState<string>(defaultText);


  const changeValue = (newValue: string) => {
    setValue(newValue || defaultText);
  };

  return (
    <Heading as="h1" mb={4}>
      {value}
    </Heading>
  );
});

export default DynamicText;
