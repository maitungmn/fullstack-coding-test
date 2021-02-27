import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText, { IRefObject } from "../components/DynamicText";
import { Box, Container, Input } from "@chakra-ui/react";

const Home = () => {
  const childRef = React.useRef<IRefObject>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    childRef.current.changeValue(e.target.value);
  };

  return (
    <Container className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box maxW="20rem">
          <DynamicText ref={childRef} />
          <Input onChange={onChange} />
        </Box>
      </main>

    </Container>
  );
};

export default Home;
