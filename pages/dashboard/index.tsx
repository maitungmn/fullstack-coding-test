import React from "react";
import { useRouter } from "next/router";

import { InferGetServerSidePropsType } from "next";
import { auth } from "@fb/launcher";
import { authValidator } from "utils/authValidator";

export const getServerSideProps = authValidator;

function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  const signOut = async () => {
    await auth.signOut();
    router.push("/auth/sign-in");
  }

  return (
    <div>
      <p>{props.message!}</p>
      <button
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
