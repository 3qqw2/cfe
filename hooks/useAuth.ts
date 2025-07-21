import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  uid: string;
  phoneNumber: string | null;
  displayName: string | null;
  email: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking auth:', error);
      return false;
    }
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  // Simple mock sign in for demo
  const mockSignIn = (phoneNumber: string) => {
    const userData = {
      uid: 'user_' + Date.now(),
      phoneNumber: phoneNumber,
      displayName: 'Demo User',
      email: null,
    };
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData));
  };


  return { 
    user, 
    loading, 
    signIn, 
    signOut, 
    checkAuthStatus, 
    isLoggedIn,
    mockSignIn 
  };
}