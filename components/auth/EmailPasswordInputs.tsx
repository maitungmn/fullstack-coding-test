import React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const EmailPasswordInputs = ({ handleChange }: { handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <Input placeholder="Email" name="email" type="email" onChange={handleChange} />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => {
            setShow(!show);
          }}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default EmailPasswordInputs;
