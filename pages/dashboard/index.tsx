import React from "react";
import nookies from "nookies";
import { useRouter } from "next/router";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "@fb/admin";
import { auth } from "@fb/launcher";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/sign-in",
      },
      props: {} as never,
    };
  }
};

function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  return (
    <div>
      <p>{props.message!}</p>
      <button
        onClick={async () => {
          await auth
            .signOut()
            .then(() => {
              router.push("/");
            });
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
