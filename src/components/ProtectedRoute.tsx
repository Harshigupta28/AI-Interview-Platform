import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-white">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-t-2 border-accent-purple animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-accent-purple animate-pulse" />
                    </div>
                </div>
                <p className="mt-4 text-xs font-semibold text-neutral-400 tracking-wider uppercase animate-pulse">
                    Restoring Session Credentials...
                </p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
