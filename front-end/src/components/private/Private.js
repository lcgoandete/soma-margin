import { useState } from "react";
import { Navigate } from "react-router-dom";

const getUser = () => JSON.parse(sessionStorage.getItem('user'));

export const Private = ({ children }) => {
  const [user] = useState(getUser);
  const [blockedPagesList] = useState(['User','FgtsBalance']);
  const [componentList] = useState(['simulationSettings']);

  if (user) {
    if (user.role === 'USER') {
      if (componentList.includes(children.props.name)) {
        return null;
      }

      if (blockedPagesList.includes(children.type.name)) {
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
