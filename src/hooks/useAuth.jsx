import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const useAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};

export default useAuth;
