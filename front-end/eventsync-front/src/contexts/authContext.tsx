"use client";
import { UserType } from "@/models/user";
import { api } from "@/services/api";
import { getUser, Login } from "@/services/login";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
    user: UserType | null;
    signIn: (data: LoginParams) => Promise<void>;
    logOut: () => void;
}

type LoginParams = { login: string; password: string };

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadUserDate = async () => {
            const userFromCookie = getCookie("user");

            let userData: UserType | null = null;

            const authToken = getCookie("loginUser.token");
            if (!userFromCookie) {
                if (authToken) {
                    userData = await getUser();
                }
            } else {
                userData = JSON.parse(userFromCookie);
            }

            setUser(userData);
        };
        loadUserDate();
    }, []);

    async function signIn({ login, password }: LoginParams) {
        const { token, user } = await Login({ login, password });

        setCookie("loginUser.token", token, { maxAge: 60 * 60 * 1 });
        setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 1 });
        setCookie("userType", user.role.toLowerCase(), { maxAge: 60 * 60 * 1 });

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setUser(user);

        router.push("/dashboard/" + user.role.toLowerCase());
    }

    function logOut() {
        deleteCookie("loginUser.token");
        deleteCookie("userType");
        setUser(null);
        delete api.defaults.headers.common["Authorization"];

        router.push("/");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, signIn, user, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return React.useContext(AuthContext);
};
