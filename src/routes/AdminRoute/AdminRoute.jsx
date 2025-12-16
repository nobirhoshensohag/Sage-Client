
import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loader from "../../components/Shared/Loader";
import Forbidden from "../../components/Shared/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const role = useRole();
  if (loading) {
    return <Loader />;
  }
  if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
