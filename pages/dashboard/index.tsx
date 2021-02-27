import React from "react";
import nookies from "nookies";
import { useRouter } from "next/router";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "@fb/admin";
import { auth } from "@fb/launcher";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/auth/sign-in",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
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