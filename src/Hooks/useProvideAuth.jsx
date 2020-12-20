import { useState } from "react";
import { authContext } from "./useAuth";
import Axios from "axios";

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (username, password, cb) => {
    const { data } = await Axios({
      method: "POST",
      data: { username, password },
      url: "http://localhost:3000/auth/login",
    });
    setUser(data);
    cb();
  };

  const signout = (cb) => {
    setUser(null);
    cb();
  };

  return {
    user,
    signin,
    signout,
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export { ProvideAuth };
export default useProvideAuth;
