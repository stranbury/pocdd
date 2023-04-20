import React, { useState, useEffect  } from 'react';
import * as Actor from "../tools/supabase/actor";
import { GetCurrentUser, checkUserSession } from '../tools/supabase/auth';
import * as Company from "../tools/supabase/company";
import useAuth from "../hooks/useAuth";
import {useRouter} from 'next/router';
const SetupForm = () => {
    const { user, loading } = useAuth();
  const Router = useRouter();
  const [isLogin , setIsLogin ] = useState(false); 
//   const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
//   const [newActor, setNewActor] = useState(null);
//   const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement file upload logic here
    console.log("user ", user);
    console.log("company ", company);
    const wannaBeActor = {
        user: user.id,
        company: company,
    }
    console.log("newActor ", wannaBeActor);
    const newActor = await Actor.createActor(wannaBeActor);
    console.log("newActor ", newActor);
    if(newActor){
        console.log("newActor ", newActor);
        Router.push('/dashboard');
    }
  };

    useEffect(() => {
        const getCompanies = async () => {
            const companies  = await Company.getActiveCompanies();
            if(companies){
                console.log("Has data");
                console.log("companies", companies);
                setCompanies(companies.data);
            }
        };
        console.log("user ", user);
        if(user){
            getCompanies();
        }
        // if(!user){
        //     Router.push('/');
        // }
        
    }, [user]);

  

  return (
    <div className="container mx-auto py-16 px-4 font-sans flex w-full justify-center flex-col items-center">
      <h2 className="text-3xl font-semibold mb-8">Setup form</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        
        <div className="flex flex-wrap mb-6">
          <label htmlFor="file-type" className="block text-gray-700 text-sm font-bold mb-2">
            Choix de l'entreprise:
          </label>
          <select
            id="company"
            value={company}
            required
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">slectionne une entreprise</option>
            {
                companies.map((company) => {
                    return <option key={company.id} value={company.id}>{company.name}</option>   
                })
            }
            
          </select>
        </div>
        
        <div className="flex flex-wrap justify-center">
            {
                company && <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Start
          </button>
            }
          
        </div>
      </form>
    </div>
  );
};

export default SetupForm;