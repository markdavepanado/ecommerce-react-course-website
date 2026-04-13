import { createContext, useState } from "react";

export const AuthContetxt = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null
  );

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((user) => user.email === email)) {
      return { success: false, error: "Email already exists." };
    }

    const newUser = { email, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  };

  return (
    <AuthContetxt.Provider value={{ signUp, user, logout, login }}>
      {children}
    </AuthContetxt.Provider>
  );
};

export default AuthProvider;
