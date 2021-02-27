import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";

const DynamicText = () => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <Heading as="h1" isTruncated>
      {value}
    </Heading>
  );
};

export default DynamicText;
