import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";

import connexion from "../services/connexion";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState("not connected");

  const contextValue = useMemo(
    () => ({ connected, setConnected }),
    [connected, setConnected]
  );

  const getProfile = async () => {
    try {
      const profile = await connexion.get(`/users/profile`);
      setConnected(profile.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("connected")) {
      getProfile();
    }
  }, [sessionStorage.getItem("connected")]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
