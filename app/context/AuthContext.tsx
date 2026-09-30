// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { jwtDecode } from "jwt-decode";
// import { AuthContextType, User } from "../interface/auth-interface";


// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
  
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const token = localStorage.getItem("userToken");

//         if (!token){
//             setIsLoading(false);
//             return;
//         }
//         try {
//             const decoded = jwtDecode<User>(token);
//             console.log(decoded)
//             setUser(decoded);
//         } catch (error) {
//             console.error("Invalid token", error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const login = (userData: User) => {
//         setUser(userData);
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("userToken");
//     };

//     return (
//         <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {

//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error(
//         "useAuth must be used inside AuthProvider"
//         );
//     }

//     return context;
// }



"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type {
  AuthContextType,
  User,
} from "../interface/auth-interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // CHECK TOKEN WHEN APPLICATION STARTS
  // =========================================================
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<User>(token);

      console.log("Decoded user:", decoded);

      setUser(decoded);
    } catch (error) {
      console.error("Invalid token:", error);

      localStorage.removeItem("userToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================
  const login = (userData: User) => {
    setUser(userData);
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = async () => {
    const token = localStorage.getItem("userToken");

    try {
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("userToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================================================
// USE AUTH
// =========================================================
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}