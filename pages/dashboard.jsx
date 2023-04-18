import React from "react";
import Link from "next/link";
// Dummy data representing files uploaded by the user
const userFiles = [
  { id: 1, name: "file1.pdf", uploadDate: "2023-04-01" },
  { id: 2, name: "file2.jpg", uploadDate: "2023-04-05" },
  { id: 3, name: "file3.docx", uploadDate: "2023-04-10" },
];

const userInfo = {
  name: "John Doe",
  companyName: "Acme Corp",
};

const Dashboard = () => {
  // Functions for handling file actions
  const viewFile = (fileId) => {
    console.log("Viewing file:", fileId);
  };

  const deleteFile = (fileId) => {
    console.log("Deleting file:", fileId);
  };

  const downloadFile = (fileId) => {
    console.log("Downloading file:", fileId);
  };

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Welcome, {userInfo.name}</h2>
        <p className="text-lg">Company: {userInfo.companyName}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Your Files</h2>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="text-sm text-gray-500 uppercase">
            <tr className="border-b">
              <th className="text-left p-4">File Name</th>
              <th className="text-left p-4">Upload Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {userFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-100">
                <td className="p-4">{file.name}</td>
                <td className="p-4">{file.uploadDate}</td>
                <td className="p-4">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => viewFile(file.id)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800 mr-4"
                    onClick={() => downloadFile(file.id)}
                  >
                    Download
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteFile(file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <Link href="/upload">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold">
            Upload Another File
            </button>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;

