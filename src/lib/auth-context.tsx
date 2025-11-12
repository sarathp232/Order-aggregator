'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock User interface, simplified from Firebase User
interface MockUser {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: MockUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user session
    const session = sessionStorage.getItem('mockUser');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate a successful login
    console.log(`Simulating login for ${email}`);
    // In a real app, you'd validate credentials here.
    // For the prototype, we'll just create a mock user.
    if (!email || !password) {
        throw new Error("Invalid credentials");
    }
    const mockUser: MockUser = { uid: 'mock-user-123', email: email };
    sessionStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, password: string) => {
    // Simulate a successful signup and login
    console.log(`Simulating signup for ${email}`);
    if (!email || !password) {
        throw new Error("Failed to create account");
    }
    const mockUser: MockUser = { uid: 'mock-user-123', email: email };
    sessionStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = async () => {
    // Simulate logout
    console.log('Simulating logout');
    sessionStorage.removeItem('mockUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
