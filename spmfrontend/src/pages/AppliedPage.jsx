import React from "react";
import AppliedCard from "../components/appliedCard";
import FetchUser from "../hook/FetchUser";
import FetchAppliedListings from "../hook/FetchAppliedListings";

const AppliedPage = () => {
  const { user } = FetchUser();
  const { data: appliedRoles, isPending: isPending } = FetchAppliedListings(
    localStorage.getItem("staffId")
  );

  return (
    <div className="bg-[#bee9e8]">
      <div className="container mx-auto p-2 min-h-screen">
        <div className="font-bold text-xl pt-10 mb-1 text-center">
          Applied Roles
        </div>
        <div className="w-2/12 ml-2 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort by Application Status
          </label>
          <select className="border rounded w-full py-2 px-3">
            <option value="all">All</option>
            <option value="successful">Successful</option>
            <option value="unsuccessful">Unsuccessful</option>
            <option value="pending">Pending</option>
            {/* Add more sorting options if needed */}
          </select>
        </div>
        {appliedRoles?.length > 0 &&
          appliedRoles.map((role, index) => (
            <AppliedCard {...role}></AppliedCard>
          ))}
      </div>
    </div>
  );
};

export default AppliedPage;
