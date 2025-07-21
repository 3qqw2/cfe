import { useState } from 'react';

interface User {
  uid: string;
  phoneNumber: string | null;
  displayName: string | null;
  email: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = (userData: User) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}