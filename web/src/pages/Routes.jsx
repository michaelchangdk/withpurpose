// Simple component - if user is authenticated, move to authstack - if user is logged out, move to publicstack
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import PublicRoutes from "./PublicRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return <>{user ? <AuthenticatedRoutes /> : <PublicRoutes />}</>;
};

export default Routes;
