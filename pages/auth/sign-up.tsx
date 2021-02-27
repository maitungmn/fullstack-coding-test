import React from "react";
import Router from "next/router";

import { AuthContext } from "@context/AuthProvider";
import firebase, { auth, usersCol } from "@fb/launcher";
import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import AuthLayout from "../../layouts/auth";

interface FormItems {
  username: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const authContext = React.useContext(AuthContext);

  const [show, setShow] = React.useState<boolean>(false);
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  } as FormItems);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClickLogin = () => {
    Router.push("/auth/sign-in");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      const userCredential: firebase.auth.UserCredential = await auth
        .createUserWithEmailAndPassword(values.email, values.password);

      authContext.setUser(userCredential);

      await usersCol(userCredential.user!.uid).set({
        email: values.email,
        username: values.username,
        phone: values.phone,
      });

      Router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Heading marginBottom={"3rem"}>Sign-up Form</Heading>

      <Stack spacing={4} width={"25vw"}>
        <Input placeholder="User Name" name="username" onChange={handleChange} />
        <Input
          type="number"
          placeholder="Phone Number"
          name="phone"
          onChange={handleChange}
        />
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
      </Stack>

      <Container
        centerContent
        marginTop={"3rem"}
        p={0}
        w={"15vw"}
      >
        <Button
          type="submit"
          marginBottom={"1rem"}
          width={"100%"}
          isLoading={isLoading}
          onClick={handleSubmit}
        >Sign Up</Button>
        <Text marginBottom={"1rem"}>Already have account?</Text>
        <Button
          width={"100%"}
          onClick={handleClickLogin}
        >Login</Button>
      </Container>
    </>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
