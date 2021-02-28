import React from "react";
import Router from "next/router";

import { AuthContext } from "@context/AuthProvider";
import { auth } from "@fb/launcher";
import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import EmailPasswordInputs from "../../components/auth/EmailPasswordInputs";
import AuthLayout from "../../layouts/auth";
import { inputFieldRequiredValidator } from "utils/inputFieldRequiredValidator";

interface UserData {
  email: string;
  password: string;
}

const Signin = () => {
  const authContext = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  } as UserData);

  const handleClickSignup = () => {
    Router.push("/auth/sign-up");
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!inputFieldRequiredValidator(values)) {
      alert("Need to fill all fields!");
    } else {
      setIsLoading(true);
      try {
        const res = await auth
          .signInWithEmailAndPassword(values.email, values.password);
        await authContext.setUser(res);
        Router.push("/dashboard");
      } catch (error) {
        console.error(error.message);
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
      <Heading marginBottom={"3rem"}>Login Form</Heading>

      <Stack spacing={2} width={"25vw"}>
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
        >Login</Button>
        <Text marginBottom={"1rem"}>Already have account?</Text>
        <Button
          width={"100%"}
          onClick={handleClickSignup}
        >Register</Button>
      </Container>
    </div>
  );
};

Signin.Layout = AuthLayout;

export default Signin;
