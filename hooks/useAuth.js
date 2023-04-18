// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { GetSession } from '../tools/supabase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await GetSession();
      if (session) {
        console.log('session', session);
        setUser(session?.user || null);
      }
      setLoading(false);
    };

    checkSession();

    return null;
  }, []);

  return { user, loading };
};

export default useAuth;

