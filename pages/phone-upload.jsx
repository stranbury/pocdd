import React, { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement file upload logic here
    console.log('Uploading file:', file, 'File type:', fileType, 'Comment:', comment);
  };

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold mb-8">Upload Form</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap mb-6">
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
        <div className="flex flex-wrap mb-6">
          <label htmlFor="file-type" className="block text-gray-700 text-sm font-bold mb-2">
            File Type:
          </label>
          <select
            id="file-type"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select file type</option>
            <option value="invoice-emit">Invoice Emit</option>
            <option value="invoice-receive">Invoice Receive</option>
            <option value="receipt">Receipt</option>
            <option value="bill">Bill</option>
          </select>
        </div>
        <div className="flex flex-wrap mb-6">
          <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
            Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-wrap">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUploadForm;
