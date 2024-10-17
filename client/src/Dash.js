import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const navigate = useNavigate();
  const [loanDetails, setLoanDetails] = useState([
    {
      _id: '1',
      loanAmount: 5000,
      loanTenure: '12 months',
      employmentStatus: 'Employed',
      date: '2023-10-01',
      status: 'pending',
    },
    {
      _id: '2',
      loanAmount: 10000,
      loanTenure: '24 months',
      employmentStatus: 'Self-Employed',
      date: '2023-08-15',
      status: 'approved',
    },
    {
      _id: '3',
      loanAmount: 7500,
      loanTenure: '18 months',
      employmentStatus: 'Unemployed',
      date: '2023-07-10',
      status: 'rejected',
    },
    {
        _id: '4',
        loanAmount: 5000,
        loanTenure: '12 months',
        employmentStatus: 'Employed',
        date: '2023-10-01',
        status: 'pending',
      },
      {
        _id: '5',
        loanAmount: 10000,
        loanTenure: '24 months',
        employmentStatus: 'Self-Employed',
        date: '2023-08-15',
        status: 'approved',
      },
      {
        _id: '6',
        loanAmount: 7500,
        loanTenure: '18 months',
        employmentStatus: 'Unemployed',
        date: '2023-07-10',
        status: 'rejected',
      },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedLoans = loanDetails.map((loan) => 
      loan._id === id ? { ...loan, status: newStatus } : loan
    );
    setLoanDetails(updatedLoans);
  };
  
  useEffect(() => {
    if(!localStorage.getItem('lo-re-auth')){
        navigate('/');
    }
  }, [])
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-700 text-lg font-medium md:ml-[700px]">Applied Loans</h4>
        
      </div>
      <div className="mt-4 bg-white shadow rounded-lg overflow-x-auto flex justify-center">
        <table className="min-w-[1400px] divide-y divide-gray-200">
          <thead className="bg-green-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Tenure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loanDetails.length > 0 ? (
              loanDetails.map((loan) => (
                <tr key={loan._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.loanAmount || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.loanTenure || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.employmentStatus || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{loan.date || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                      loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={loan.status || 'pending'}
                      onChange={(e) => handleStatusChange(loan._id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No loan details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dash;