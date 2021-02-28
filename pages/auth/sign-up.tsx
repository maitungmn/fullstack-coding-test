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
import EmailPasswordInputs from "../../components/auth/EmailPasswordInputs";
import { inputFieldRequiredValidator } from "utils/inputFieldRequiredValidator";

interface FormItems {
  username: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const authContext = React.useContext(AuthContext);

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
    if (!inputFieldRequiredValidator(values)) {
      alert("Need to fill all fields!");
    } else {
      setIsLoading(true);

      try {
        const userCredential: firebase.auth.UserCredential = await auth
          .createUserWithEmailAndPassword(values.email, values.password);

        await authContext.setUser(userCredential);

        await usersCol(userCredential.user!.uid).set({
          email: values.email,
          username: values.username,
          phone: values.phone,
        });

        Router.push("/dashboard");
      } catch (error) {
        console.log(error.message);
        alert(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    }}>
      <Heading marginBottom={"3rem"}>Sign-up Form</Heading>

      <Stack spacing={4} width={"25vw"}>
        <Input placeholder="User Name" name="username" onChange={handleChange} />
        <Input
          type="number"
          placeholder="Phone Number"
          name="phone"
          onChange={handleChange}
        />
        <EmailPasswordInputs handleChange={handleChange} />
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
    </div>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
