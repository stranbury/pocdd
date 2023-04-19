import React, { useRef, useState} from 'react';
import {uploadFile } from '../tools/supabase/upload';
import { createFile } from '../tools/supabase/files';
const Upload = () => {
  const fileInput = useRef();
  const fileTypeInput = useRef();
  const commentsInput = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const file = fileInput.current.files[0];
    const fileType = fileTypeInput.current.value;
    const comments = commentsInput.current.value;
    
    // Implement your file upload logic here
    try {
      // Simulate an async file upload
      // console.log('Uploading file:', file, 'File type:', fileType, 'Comment:', comments);
      const { data, error } = await uploadFile(file);
      if (error) {
        console.log('Error uploading file:', error.message);
        
        setError(error.message);
      }
      if(data){
        setLoading(false);
        setSuccess(true);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      
    } catch (err) {
      setError('Error uploading the file');
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto py-16 px-4 font-sans lg:flex lg:h-screen lg:items-center lg:flex-col">
      <h2 className="text-3xl font-semibold mb-8">Upload a File</h2>
      <form onSubmit={handleUpload} className="w-full max-w-md">
           {success && <div className="bg-green-100 text-green-700 p-4 mb-6 rounded">File uploaded successfully!</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">{error}</div>}
        {loading && <div className="bg-blue-100 text-blue-700 p-4 mb-6 rounded">Uploading file...</div>}
        <div className="mb-6 hidden md:block">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            Choose a file to upload:
          </label>
          <input
            ref={fileInput}
            id="file"
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-wrap mb-6  md:hidden">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            Upload File or Take a Picture:
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="fileType" className="block text-gray-700 text-sm font-bold mb-2">
            File Type:
          </label>
          <select
            ref={fileTypeInput}
            id="fileType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="invoice_emit">Invoice Emit</option>
            <option value="invoice_receipt">Invoice Receipt</option>
            <option value="receipt">Receipt</option>
            <option value="bill">Bill</option>
          </select>
        </div>


        <div className="mb-6">
          <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">
            Comments:
          </label>
          <textarea
            ref={commentsInput}
            id="comments"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
