import styles from "../styles/Home.module.css";
import React from "react";

const AuthLayout = ({ children }) => (
  <main className={`${styles.main} ${styles["auth-main"]}`}>
    {children}
  </main>
);

export default AuthLayout;
