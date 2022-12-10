import { useState } from "react";
import { Navigate } from "react-router-dom";

const getUser = () => JSON.parse(localStorage.getItem('user'));

export const Private = ({ children }) => {
  const [user] = useState(getUser);
  
  if (user) {
    if (user.role === 'USER') {
      if (children.type.name === 'User') {
        return <Navigate to="/forbidden" />;
      } else {
        return children;
      }
    }

    if (user.role === 'ADMIN') {
      return children;
    }
  }

  return <Navigate to="/forbidden" />;
}