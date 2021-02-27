import styles from "../styles/Home.module.css";
import React from "react";
import { classNamesParser } from "utils/classNamesParser";
console.log(classNamesParser(["main", "auth-main"], styles))
const AuthLayout = ({ children }) => (
  <main className={classNamesParser(["main", "auth-main"], styles)}>
    {children}
  </main>
);

export default AuthLayout;
