'use client';
import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface AppContextType{
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
    isLoggedIn: false,
    setLoggedIn: (): boolean => false,
});

const AppProvider = ({ children }: { children: any }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    return (
        <AppContext.Provider value={{
            isLoggedIn, setLoggedIn
        }}>
        {children}
        </AppContext.Provider>
    )
}
export { AppContext, AppProvider };
