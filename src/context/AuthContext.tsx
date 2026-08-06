import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => { success: boolean; message?: string; role?: UserRole };
  register: (userData: Partial<User> & { password?: string }) => { success: boolean; message?: string; role?: UserRole };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  demoLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'medibook_auth_user';
const LOCAL_STORAGE_USERS_LIST = 'medibook_users_list';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse auth user from localStorage', e);
    }
    // Default logged in user for rich immediate experience (Patient Sarah Jenkins)
    return INITIAL_USERS[0];
  });

  const [usersList, setUsersList] = useState<User[]>(() => {
    try {
      const savedList = localStorage.getItem(LOCAL_STORAGE_USERS_LIST);
      if (savedList) {
        return JSON.parse(savedList);
      }
    } catch (e) {
      console.error('Failed to parse users list', e);
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USERS_LIST, JSON.stringify(usersList));
  }, [usersList]);

  const login = (email: string, _password?: string, targetRole?: UserRole) => {
    const found = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (targetRole && found.role !== targetRole) {
        return { success: false, message: `This account is registered as a ${found.role}. Please select the correct portal.` };
      }
      setUser(found);
      return { success: true, role: found.role };
    }

    // Fallback matching demo credential shortcuts
    if (email === 'patient@example.com') {
      const p = INITIAL_USERS[0];
      setUser(p);
      return { success: true, role: p.role };
    }
    if (email === 'doctor@medibook.com') {
      const d = INITIAL_USERS[1];
      setUser(d);
      return { success: true, role: d.role };
    }
    if (email === 'admin@medibook.com') {
      const a = INITIAL_USERS[2];
      setUser(a);
      return { success: true, role: a.role };
    }

    // Auto-create standard user if valid email provided for smooth seamless experience
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: targetRole || 'patient',
      createdAt: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    };
    setUsersList(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true, role: newUser.role };
  };

  const register = (userData: Partial<User> & { password?: string }) => {
    const existing = usersList.find(u => u.email.toLowerCase() === (userData.email || '').toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || '',
      role: userData.role || 'patient',
      phone: userData.phone || '',
      gender: userData.gender || 'other',
      dateOfBirth: userData.dateOfBirth || '',
      address: userData.address || '',
      createdAt: new Date().toISOString().split('T')[0],
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      bloodGroup: userData.bloodGroup || 'A+',
    };

    setUsersList(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true, role: newUser.role };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    setUsersList(prev => prev.map(u => (u.id === user.id ? updated : u)));
  };

  const demoLogin = (role: UserRole) => {
    if (role === 'patient') {
      login('patient@example.com', 'Password123', 'patient');
    } else if (role === 'doctor') {
      login('doctor@medibook.com', 'Doctor@123', 'doctor');
    } else if (role === 'admin') {
      login('admin@medibook.com', 'Admin@123', 'admin');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
