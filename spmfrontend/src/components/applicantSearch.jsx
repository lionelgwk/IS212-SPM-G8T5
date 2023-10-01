import React, { useState } from 'react';

const ApplicantSearch = () => {
    const [textFilter, setTextFilter] = useState('');
    const [numberFilter, setNumberFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
  
    const handleTextChange = (e) => {
      setTextFilter(e.target.value);
    };
  
    const handleNumberChange = (e) => {
      setNumberFilter(e.target.value);
    };
  
    const handleDateChange = (e) => {
      setDateFilter(e.target.value);
    };
  
    const handleSearch = () => {
      // Add code to handle search based on filters
    };
  
    return (
      <div className="bg-[#bee9e8] p-4 mb-4 rounded shadow-md flex items-center justify-center">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search Applicant ID
          </label>
          <input
          type="number"
          placeholder="Number Filter"
          value={numberFilter}
          onChange={handleNumberChange}
          className="border rounded py-2 px-3 mr-4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search Role
          </label>
          <input
          type="text"
          placeholder="Text Filter"
          value={textFilter}
          onChange={handleTextChange}
          className="border rounded py-2 px-3 mr-4"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search Applied Date
          </label>
          <input
          type="date"
          placeholder="Date Filter"
          value={dateFilter}
          onChange={handleDateChange}
          className="border rounded py-2 px-3 mr-4"
          />
        </div>
      </div>
    );
  };  
export default ApplicantSearch;
