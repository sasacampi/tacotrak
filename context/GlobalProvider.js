import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      let token = null;

      // Verificar se localStorage está disponível
      if (typeof window !== "undefined" && window.localStorage) {
        token = localStorage.getItem("userToken");
      }

      if (token) {
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsLogged(true);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Erro ao verificar a sessão do usuário:", error);
          setIsLogged(false);
          setUser(null);
        }
      } else {
        setIsLogged(false);
        setUser(null);
      }

      setLoading(false);
    };

    checkUserSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
