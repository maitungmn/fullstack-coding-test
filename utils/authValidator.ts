import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "@fb/admin";
import { usersColGetOnce } from "@fb/launcher";

interface userInfos  {
  role?: string;
  email: string;
  phone: string;
  username: string;
}

export const authValidator = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    let userInfo = {} as userInfos
    const userSnapshot = await usersColGetOnce(token.uid).get();
    if(userSnapshot.exists()) {
      userInfo = userSnapshot.val()
    }
    return {
      props: { user: { ...token, infos: userInfo } },
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
