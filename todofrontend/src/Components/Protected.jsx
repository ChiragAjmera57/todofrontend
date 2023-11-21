import { Navigate, useNavigate } from "react-router-dom";
const Protected = ({ children }) => {
    const navigate = useNavigate()
  if (!localStorage.getItem('auth')) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;