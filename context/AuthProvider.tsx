import React from "react";
import nookies from "nookies";
import firebase, { auth } from "@fb/launcher";

type TUser = firebase.User | null

interface IContextProps {
  user: TUser;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
}

export const AuthContext = React.createContext<Partial<IContextProps>>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState(null as TUser);
  const [loadingAuthState, setLoadingAuthState] = React.useState(true);

  React.useEffect(() => {
    auth.onIdTokenChanged(async (user: TUser) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
      setLoadingAuthState(false);
    });
  }, []);

  // force refresh the token every 10 minutes
  React.useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 60 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
