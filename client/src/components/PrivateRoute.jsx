import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="signin" />;
}

export default PrivateRoute;
