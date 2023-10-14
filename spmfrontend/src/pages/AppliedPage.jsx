import React from 'react'
import AppliedCard from '../components/appliedCard'

const Applied = () => {
  return (
    <div className="bg-[#bee9e8]">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-10 mb-1 text-center">Applied Roles</div>
        <div className="w-2/12 ml-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sort by Application Status
            </label>
            <select className="border rounded w-full py-2 px-3">
              <option value="latest">Successful</option>
              <option value="oldest">Unsuccessful</option>
              <option value="oldest">Pending</option>
              {/* Add more sorting options if needed */}
            </select>
          </div>
        <AppliedCard></AppliedCard>
        <AppliedCard></AppliedCard>
        <AppliedCard></AppliedCard>
      </div>
    </div>
  )
}

export default Applied