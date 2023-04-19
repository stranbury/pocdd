// components/Layout.js
import { Menu } from '@headlessui/react'
import { LogIn } from 'react-feather';
import Link from 'next/link';
// import useAuth from '../hooks/useAuth';
import UserLogin from './UserLogin';
import { checkUserSession } from '../tools/supabase/auth';
import Login from '../pages/auth/login';
import { useEffect, useState } from 'react';
export default function Layout({ children }) {
  const [ isLogin , setIsLogin ] = useState(false)
  useEffect(()=>{
    const checkUser = async () => {
      const user = await checkUserSession();
      console.log(user)
      setIsLogin(user)
    }
    checkUser()
  },[])
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      {/* Navigation */}
     <div className="navbar bg-base-100">
        <div className="navbar-start">
          
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost normal-case text-xl">PEP Conseils</Link>
        </div>
        <div className="navbar-end">
          {
            isLogin ?
            <UserLogin/>:
            <Link href="/auth/login">
              <button className="btn btn-ghost btn-circle">
                <LogIn/>
              </button>
            </Link>
          }
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} PEP Conseils. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
