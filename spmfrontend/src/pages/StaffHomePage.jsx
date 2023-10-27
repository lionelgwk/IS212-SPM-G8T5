import React, { useState, useEffect, useContext } from "react";
import RoleSearch from "../components/roleSearch";
import RoleCard from "../components/roleCard";
import Pagination from "../components/Pagination";
import FetchUser from "../hook/FetchUser";
import FetchOpenListings from "../hook/FetchOpenListings";
import { AiFillFrown } from "react-icons/ai";
// import ApplyModal from "../components/ApplyModal";

const StaffHomePage = () => {
  // const roles = [
  //   {
  //     id: 1,
  //     name: "Software Engineer",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["MacOS", "Windows", "Linux"],
  //   },
  //   {
  //     id: 2,
  //     name: "2nd Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["React", "Node", "Express"],
  //   },
  //   {
  //     id: 3,
  //     name: "3rd Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["Excel", "Word", "Powerpoint"],
  //   },
  //   {
  //     id: 4,
  //     name: "4th Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["Problem Solving", "Node", "Express"],
  //   },
  //   {
  //     id: 5,
  //     name: "5th Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["React", "Node", "Teamwork"],
  //   },
  //   {
  //     id: 6,
  //     name: "6th Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["Communication", "Teamwork", "Problem Solving"],
  //   },
  //   {
  //     id: 7,
  //     name: "7th Job",
  //     description: "Software Engineer",
  //     department: "Software Engineer",
  //     jobLevel: "Software Engineer",
  //     wage: "Software Engineer",
  //     skills: ["React", "Node", "Express"],
  //   },
  // ];

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
  const { data: data, pending: isPending } = FetchOpenListings();
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  useEffect(() => {
    if (!isPending) {
      setAllRoles(data);
      setFilteredRoles(data);
      console.log(filteredRoles);
    }
    setCurrentRoles(filteredRoles.slice(indexOfFirstJob, indexOfLastJob));
  }, [data]);

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
    <div className="bg-[#bee9e8] h-screen">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-5 mb-1 text-center">
          Welcome {user.lname} {user.fname}{" "}
        </div>
        <button onClick={(e) => console.log(user.active_skills)}>
          console
        </button>

        <RoleSearch
          handleSearching={handleSearching}
          handleSkillSearching={handleSkillSearching}
          filterRolesByName={filterRolesByName}
          filterRolesBySkills={filterRolesBySkills}
          className="z-0"
        ></RoleSearch>

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
                <RoleCard
                  key={role.role_id}
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
                <RoleCard
                  key={role.role_id}
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
export default StaffHomePage;
