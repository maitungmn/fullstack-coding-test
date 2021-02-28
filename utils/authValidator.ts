import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "@fb/admin";

export const authValidator = async (ctx: GetServerSidePropsContext) => {
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
