import { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({});
  
  const data = { user, setUser };
  
  return (
    <LoginContext.Provider value={ data }>
      {children}
    </LoginContext.Provider>
  );
}
