import React from "react";
import Router from "next/router";

import { AuthContext } from "@context/AuthProvider";
import firebase, { auth, usersCol } from "@fb/launcher";
import { Box, Button, Container, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import DynamicText from "../../components/DynamicText";
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

  const handleClick = () => {
    Router.push("/auth/signin");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log(values, "values");
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        authContext.setUser(userCredential);
        usersCol
          .doc(userCredential.user!.uid)
          .set({
            email: values.email,
            username: values.username,
            phone: values.phone,
          })
          .then(() => {
            console.log("ok");
            Router.push("/dashboard");
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message);
          });
      });
  };

  return (
    // <div style={{ textAlign: "center" }}>
    //   <h1>Sign Up</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br /><br />
    //     <input type="text" name="phone" placeholder="Phone" onChange={handleChange} /><br /><br />
    //     <input type="text" name="email" placeholder="Enter your Email" onChange={handleChange} /><br /><br />
    //     <input type="password" name="password" placeholder="Enter your Password" onChange={handleChange} /><br /><br />
    //     <button type="submit">Sign Up</button>
    //     <p>Already have account?</p>
    //     <button onClick={handleClick}>Login</button>
    //   </form>
    // </div>
    <Box maxW="20rem">
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => {
            setShow(!show);
          }}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
