import { useEffect, useState } from 'react';
import supabase from '../../tools/supabase';

const useEmailVerification = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const { user } = await supabase.auth.user();

        if (user && user.email_confirmed_at) {
          setIsEmailVerified(true);
        } else {
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.error('Error checking email verification:', error);
        setIsEmailVerified(false);
      } finally {
        setLoading(false);
      }
    };

    checkEmailVerification();
  }, []);

  return { isEmailVerified, loading };
};

export default useEmailVerification;
