// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { GetSession } from '../tools/supabase/auth';
import { getActorByUserId } from '../tools/supabase/actor';
import { getCompanyById } from '../tools/supabase/company';
import { useRouter } from 'next/router';
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [actor , setActor] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const CurrentSession  = await GetSession();
      if (CurrentSession) {
        // console.log('session', CurrentSession.data.session );
        const user = CurrentSession.data.session?.user;

        setUser(user || null);

        const actor = await getActorByUserId(user?.id);
        // console.log('actor', actor);
        if(actor.data.length > 0){

          const company = await getCompanyById(actor.data[0].company);
          // console.log('company', company);
          if(company.data.length > 0){
             setCompany(company.data[0]);
          }
          setActor(actor.data[0]);

        } 
        
     
      }else{
         router.push('/');
      }
      setLoading(false);
     
      
    };

    checkSession();

    return () => {};
  }, []);

  return { user,actor , company, loading };
};

export default useAuth;

