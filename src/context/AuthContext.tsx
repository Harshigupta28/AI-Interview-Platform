import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken, removeAuthToken, getAuthToken } from '../utils/api';

interface User {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    profilePicture?: string;
    resume?: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (fullName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (fullName: string) => Promise<void>;
    setUserResume: (resumeUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const token = getAuthToken();
            const savedUser = localStorage.getItem("user");

            if (token && savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    removeAuthToken();
                    localStorage.removeItem("user");
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data: any = await api.post("/auth/login", { email, password });
            
            setAuthToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (fullName: string, email: string, password: string) => {
        setLoading(true);
        try {
            await api.post("/auth/register", { fullName, email, password });
            // Auto login after registration
            await login(email, password);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeAuthToken();
        localStorage.removeItem("user");
        setUser(null);
    };

    const updateUser = async (fullName: string) => {
        try {
            const data: any = await api.put("/users/profile", { fullName });
            
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    };

    const setUserResume = (resumeUrl: string) => {
        if (user) {
            const updated = { ...user, resume: resumeUrl };
            localStorage.setItem("user", JSON.stringify(updated));
            setUser(updated);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, setUserResume }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
