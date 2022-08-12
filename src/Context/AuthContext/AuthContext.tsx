import { createContext, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthType } from "../../types/AuthContext.types";

const AuthContext = createContext<AuthType | null>(null)

const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) : JSX.Element => {

    const auth = useAuth()

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export { useAuthContext, AuthProvider}