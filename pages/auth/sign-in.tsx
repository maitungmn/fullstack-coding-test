import React from "react";
import Router from "next/router";

import { AuthContext } from "@context/AuthProvider";
import { auth } from "@fb/launcher";

interface UserData {
  email: string;
  password: string;
}

const Signin = () => {
  const authContext = React.useContext(AuthContext);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  } as UserData);

  const handleClick = () => {
    Router.push("/auth/signup");
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await auth
        .signInWithEmailAndPassword(values.email, values.password);
      authContext.setUser(res);
      console.log(res, "res");
      Router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={values.email} placeholder="Enter your Email"
               onChange={handleChange} /><br /><br />
        <input type="password" name="password" value={values.password} placeholder="Enter your Password"
               onChange={handleChange} /><br /><br />
        <button>Login</button>
        <p>Not logged in yet?</p>
        <button onClick={handleClick}>SignUp</button>
      </form>
    </div>
  );
};

export default Signin;
