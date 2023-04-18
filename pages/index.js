import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">File Uploader</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our file uploader and sharing web app.
        </p>
       
        <Link href="/dashboard">
           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  )
}
