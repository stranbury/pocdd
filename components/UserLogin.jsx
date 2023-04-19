import { useEffect, useState } from 'react';
import feather from 'feather-icons'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetCurrentUser } from '../tools/supabase/auth';
const UserLogin = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const  getUserInfo = async () => {
            const user = await GetCurrentUser(); 
            console.log("user ", user); 
            if(user){
                setUser(user)
            }
        }
        getUserInfo()


    }, [])
    return (<div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://ui-avatars.com/api/?name=John+Doe" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link href="/dashboard" className="justify-between">
            Dashboard
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link href="/upload"> new file</Link></li>
        {/* <li><a>Settings</a></li> */}
        <li>
            <a  onClick={()=>{
            Logout().then(()=>{
                router.push('/auth/login')
            })
        }}>Logout</a></li>
      </ul>
    </div>)
}
export default UserLogin; 