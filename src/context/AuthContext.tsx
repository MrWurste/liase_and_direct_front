import { AxiosError } from "axios";
import React, { createContext, useState, useCallback, useEffect } from "react";
import { json } from "stream/consumers";
import axios from "../api/axios";
import { Auth } from "../models/Auth";

const defaultValues: AuthContextType = {
    currentUser: null,
    userModifier: (user: Auth | null) => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValues);

type AuthContextType = {
    currentUser: Auth | null;
    userModifier: (user: Auth | null) => void;
};

/*interface Auth {
    email: string,
    password: string,
    roles: string,
    accessToken: string
}*/

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<Auth | null>(null);
    const userModifier = (user: Auth | null) => {
        setCurrentUser(user);
      };
    
      const getUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("token") ?? "";
            const response = await axios.get(
                "/user",
                {
                    headers: {
                        'Authorization':`Bearer ${token}`
                },
                    withCredentials: true
                }
            );
            userModifier({
                email: response?.data?.email,
                roles: response?.data?.role,
                accessToken: token,
                firstname: response?.data?.firstname,
                lastname: response?.data?.lastname,
            })
        } catch(error) {
            const e = error as AxiosError;
        }
      },[]);

      useEffect(() => {
        if (!currentUser?.email) {
            getUser();
        }
      }, [getUser, currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, userModifier}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

/*import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface Props {
    children: JSX.Element;
}
interface Auth {
    // The properties you expect on the `auth` variable
    email: string,
    password: string,
    roles: string,
    accessToken: string
}
interface AuthContextInterface {
    auth: Auth
    setAuth: Dispatch<SetStateAction<Auth>>
}

const AuthContext = createContext<AuthContextInterface>({
    auth: { email: "", password: "", roles: "", accessToken: "" },
    setAuth: () => { }
});

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<Auth>({email: "b", password: "b", roles: "b", accessToken: "b"});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;*/