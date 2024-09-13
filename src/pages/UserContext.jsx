// UserContext.js
import React, { createContext, useState, useContext } from "react";

// Create the UserContext with a default value
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    ID: "",
    Name: "",
    "Phone Number": "",
    Password: "",
    "Email ID": "",
    "Alternative Mobile.NO": "",
    Age: "",
    "Sign Status": "active",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
