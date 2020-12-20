import { createContext, useContext } from "react";

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

export { authContext };
export default useAuth;
