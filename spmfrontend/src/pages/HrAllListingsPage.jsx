import React, { useState, useEffect, useContext } from "react";
import RoleSearchAll from "../components/roleSearchAll";
import RoleCardAll from "../components/roleCardAll";
import Pagination from "../components/Pagination";
import FetchUser from "../hook/FetchUser";
import FetchAllListings from "../hook/FetchAllListings";
import { AiFillFrown } from "react-icons/ai";
// import ApplyModal from "../components/ApplyModal";

const HrAllListingsPage = () => {
  const [roles, setRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSkillSearching, setIsSkillSearching] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const jobsPerPage = 5;

  const { user } = FetchUser();
  const { data: data, pending: isPending } = FetchAllListings();
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  useEffect(() => {
    if (!isPending) {
      setAllRoles(data);
      setFilteredRoles(data);
      setCurrentPage(1);
    }
  }, [data, isPending]);

  useEffect(() => {
    setCurrentRoles(filteredRoles.slice(indexOfFirstJob, indexOfLastJob));
  }, [currentPage, filteredRoles, indexOfFirstJob, indexOfLastJob]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearching = (searching) => {
    setIsSearching(searching);
  };

  const handleSkillSearching = (searching) => {
    setIsSkillSearching(searching);
  };

  const filterRolesByName = (searchInput) => {
    const lowerSearchInput = searchInput.toLowerCase();
    const filtered = allRoles.filter((role) =>
      role.role_name.toLowerCase().includes(lowerSearchInput)
    );
    setFilteredRoles(filtered);
    setCurrentPage(1); // Reset pagination to the first page after search
  };

  const filterRolesBySkills = (skills) => {
    setSelectedSkills(skills);
    // Filter jobs based on selected skills
    const filtered = allRoles.filter((role) =>
      skills.every((skill) => role.role_skills.includes(skill))
    );
    setFilteredRoles(filtered);
  };

  return (
    <div className="bg-[#bee9e8]">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-5 mb-1 text-center">
          All Listing Search
        </div>
        <RoleSearchAll
          handleSearching={handleSearching}
          handleSkillSearching={handleSkillSearching}
          filterRolesByName={filterRolesByName}
          filterRolesBySkills={filterRolesBySkills}
          className="z-0"
        ></RoleSearchAll>

        {isSearching || isSkillSearching ? null : (
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={allRoles.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}

        {filteredRoles.length > 0 ? (
          (isSearching || isSkillSearching) && filteredRoles.length > 0 ? (
            <div className="flex flex-col gap-4 mt-4">
              {filteredRoles.map((role) => (
                <RoleCardAll
                  key={role.role_listing_id}
                  id={role.role_listing_id}
                  title={role.role_name}
                  description={role.role_listing_desc}
                  skills={role.role_skills}
                  date={role.role_listing_open}
                  deadline={role.role_listing_close}
                  mySkills={user.active_skills}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {currentRoles.map((role) => (
                <RoleCardAll
                  key={role.role_listing_id}
                  id={role.role_listing_id}
                  title={role.role_name}
                  description={role.role_listing_desc}
                  skills={role.role_skills}
                  date={role.role_listing_open}
                  deadline={role.role_listing_close}
                  mySkills={user.active_skills}
                />
              ))}
            </div>
          )
        ) : (
          <div className="flex justify-center p-6">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="flex justify-center card-body">
                <div className="flex justify-center">
                  <AiFillFrown size={70} />
                </div>
                <h2 className="flex justify-center card-title text-[#949391]">
                  No open roles!
                </h2>
                <h2 className="flex justify-center text-[#949391]">
                  Perhaps we could check back later?
                </h2>
              </div>
            </div>
          </div>
        )}

        {isSearching || isSkillSearching ? null : (
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={allRoles.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
export default HrAllListingsPage;
