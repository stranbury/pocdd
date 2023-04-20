import React, {useEffect, useState} from "react";
import Link from "next/link";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import useAuth from "../hooks/useAuth";
import * as File from '../tools/supabase/files';
import * as Upload from '../tools/supabase/upload';
// Dummy data representing files uploaded by the user
// const userFiles = [
//   { id: 1, name: "file1.pdf", uploadDate: "2023-04-01" },
//   { id: 2, name: "file2.jpg", uploadDate: "2023-04-05" },
//   { id: 3, name: "file3.docx", uploadDate: "2023-04-10" },
// ];

// const userInfo = {
//   name: "John Doe",
//   companyName: "Acme Corp",
// };

const Dashboard = () => {
  // Functions for handling file actions
  const [userFiles, setUserFiles] = useState([]);
  const [userInfo , setUserInfo] = useState({});
  const viewFile = (fileId) => {
    console.log("Viewing file:", fileId);
  };
 const getUserFiles = async () => {
        const files  = await File.getFilesByActorIdAndCompanyId(actor.id, company.id);
        if(files){
            console.log("Has data");
            console.log("files", files);
            setUserFiles(files.data);
        }
    };
  const deleteFile = async (fileId, fileName ) => {
    console.log("Deleting file:", fileId);
    const deletedFile = await File.deleteFile(fileId);
    if(deletedFile){
        console.log("deletedFile ", deletedFile);
        const deletedFileFromStorage = await Upload.deleteUploadedFile(fileName);
        if(deletedFileFromStorage){
            console.log("deletedFileFromStorage ", deletedFileFromStorage);
            await getUserFiles()
            alert("your file has been deleted");
        }
    }

  };

  const downloadFile = async (FileName) => {
    console.log("Downloading file:", FileName);
    const file = await Upload.getUploadedFile(FileName);
    if(file){
        console.log("file ", file);
        alert("Downloaded");
    }
  };
  
  const router = useRouter();
  const { user, actor, company, loading } = useAuth(); 
  // console.log("user ", user);
  // console.log("actor ", actor);
  // console.log("company ", company);
  // console.log("loading ", loading);

 
  useEffect(() => {
    // const getUserFiles = async () => {
    //     const files  = await File.getFilesByActorIdAndCompanyId(actor.id, company.id);
    //     if(files){
    //         console.log("Has data");
    //         console.log("files", files);
    //         setUserFiles(files.data);
    //     }
    // };
    if (!loading && user && (!actor || !company)) {
        setTimeout(() => {
           router.push('/setup');
    }, 5000);
    }
    if (!loading && user && actor && company) {
        setUserInfo({
            name: user.user_metadata.full_name,
            companyName: company.name,
        });
        getUserFiles();
    }

  }, [actor, user, company,  loading, router]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to the index page...</div>;
  }
  if (!actor || !company) {
    return <div>Redirecting to the setup...</div>;
  }

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Welcome, {userInfo.name}</h2>
        <p className="text-lg">Company: {userInfo.companyName}</p>
      </section>
{
  userFiles.length > 0 ? (

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Your Files</h2>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="text-sm text-gray-500 uppercase">
            <tr className="border-b">
              <th className="text-left p-4">File Name</th>
              <th className="text-left p-4">Upload Date</th>
              <th className="text-left p-4">TYPE</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {userFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-100">
                <td className="p-4">{file.name}</td>
                <td className="p-4">{file.created_at}</td>
                <td className="p-4">{file.type}</td>
                <td className="p-4">
                  <a href={file.url} target="_blank">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => viewFile(file.id)}
                  >

                    View
                  </button>
                  </a>
                  <button
                    className="text-green-600 hover:text-green-800 mr-4"
                    onClick={() => downloadFile(file.name)}
                  >
                    Download
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() =>  deleteFile(file.id, file.path.replace("public/", ""))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>) : (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">You have no files</h2>
        </section>
      )
}

      <section className=" flex w-full justify-center">
        <Link href="/upload">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold">
            Upload Another File
            </button>
        </Link>
      </section>
    </div>
  );
};
// Dashboard.Layout = Layout;
export default Dashboard;

