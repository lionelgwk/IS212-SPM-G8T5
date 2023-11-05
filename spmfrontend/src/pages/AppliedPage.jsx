import React, { useState } from "react";
import AppliedCard from "../components/appliedCard";
import FetchUser from "../hook/FetchUser";
import FetchAppliedListings from "../hook/FetchAppliedListings";
import { AiFillFrown, AiFillSmile } from "react-icons/ai";

const AppliedPage = () => {
  const { user } = FetchUser();
  const { data: appliedRoles, isPending: isPending } = FetchAppliedListings(
    localStorage.getItem("staffId")
  );

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRoles = appliedRoles?.filter((role) => {
    if (filter === "all") return true;
    return role.role_app_status === filter;
  });

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
          <select
            className="border rounded w-full py-2 px-3"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
        {filteredRoles?.length === 0 && (
          <div className="flex justify-center p-6">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="flex justify-center card-body">
                <div className="flex justify-center">
                  {filter == "applied" ? <AiFillFrown size={70} /> : <AiFillSmile size={70} />}
                </div>
                <h2 className="flex justify-center card-title text-[#949391]">
                  No {filter} roles!
                </h2>
              </div>
            </div>
          </div>
        )}
        {filteredRoles?.length > 0 &&
          filteredRoles.map((role, index) => (
            <AppliedCard {...role} key={index}></AppliedCard>
          ))}
      </div>
    </div>
  );
};

export default AppliedPage;
