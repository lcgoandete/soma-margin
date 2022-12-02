import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    return children;
  }
  return <Navigate to="/forbidden" />;
}