import React, { useState } from 'react';

const NewCompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement your logic to create a new company here
    console.log('New company:', { companyName, companyAddress, companyEmail });
  };

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold mb-8">Create a New Company</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold" htmlFor="companyName">
            Company Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold" htmlFor="companyAddress">
            Company Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="companyAddress"
            type="text"
            placeholder="Company Address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold" htmlFor="companyEmail">
            Company Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="companyEmail"
            type="email"
            placeholder="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCompanyForm;
