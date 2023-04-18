import React, { useState, useEffect } from 'react';

// Replace this function with a call to your API to fetch the companies
const fetchCompanies = async () => {
  return [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ];
};

// Replace this function with a call to your API to fetch the files of a specific company
const fetchCompanyFiles = async (companyId) => {
  return [
    { id: 1, name: 'File 1', companyId },
    { id: 2, name: 'File 2', companyId },
    { id: 3, name: 'File 3', companyId },
  ];
};

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyFiles, setCompanyFiles] = useState([]);

  useEffect(() => {
    async function loadCompanies() {
      const fetchedCompanies = await fetchCompanies();
      setCompanies(fetchedCompanies);
    }
    loadCompanies();
  }, []);

  const handleCompanyClick = async (companyId) => {
    setSelectedCompany(companyId);
    const fetchedFiles = await fetchCompanyFiles(companyId);
    setCompanyFiles(fetchedFiles);
  };

  const handleFileUpload = () => {
    console.log('File upload for company', selectedCompany);
    // Implement file upload logic for the selected company
  };

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold mb-8">Admin Dashboard</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4">
          <h3 className="text-xl font-semibold mb-4">Companies</h3>
          <ul className="divide-y divide-gray-300">
            {companies.map((company) => (
              <li key={company.id} className="py-4 cursor-pointer" onClick={() => handleCompanyClick(company.id)}>
                {company.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedCompany && (
          <div className="w-full lg:w-2/3 px-4">
            <h3 className="text-xl font-semibold mb-4">Files for Company {selectedCompany}</h3>
            <ul className="divide-y divide-gray-300 mb-8">
              {companyFiles.map((file) => (
                <li key={file.id} className="py-4">
                  {file.name}
                  {/* Add action buttons (e.g., view, delete, download) here */}
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleFileUpload}
            >
              Upload File for Company
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

