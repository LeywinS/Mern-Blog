import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function PrivateRouteAdmin() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="Home" />;
}

export default PrivateRouteAdmin;
