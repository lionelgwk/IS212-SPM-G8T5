import React, { useState, useEffect, useContext } from "react";
import RoleSearch from "../components/roleSearch";
import RoleCard from "../components/roleCard";
import Pagination from "../components/Pagination";
import FetchUser from "../hook/fetchUser";


const StaffHomePage = () => {
  const roles = [
    {
      id: 1,
      name: "Software Engineer",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["MacOS", "Windows", "Linux"],
    },
    {
      id: 2,
      name: "2nd Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["React", "Node", "Express"],
    },
    {
      id: 3,
      name: "3rd Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["Excel", "Word", "Powerpoint"],
    },
    {
      id: 4,
      name: "4th Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["Problem Solving", "Node", "Express"],
    },
    {
      id: 5,
      name: "5th Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["React", "Node", "Teamwork"],
    },
    {
      id: 6,
      name: "6th Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["Communication", "Teamwork", "Problem Solving"],
    },
    {
      id: 7,
      name: "7th Job",
      description: "Software Engineer",
      department: "Software Engineer",
      jobLevel: "Software Engineer",
      wage: "Software Engineer",
      skills: ["React", "Node", "Express"],
    },
  ];

  const [allRoles, setAllRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSkillSearching, setIsSkillSearching] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstJob, indexOfLastJob);
  
  const { user } = FetchUser();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearching = (searching) => {
    setIsSearching(searching);
  };

  const handleSkillSearching = (searching) => {
    setIsSkillSearching(searching);
  };

  useEffect(() => {
    // fetch("http://localhost:5000/roles")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setAllRoles(data);
    //     setFilteredRoles(data);
    //   })
    //   .catch((err) => console.log(err));

    setAllRoles(roles);
    setFilteredRoles(roles);
  }, []);

  const filterRolesByName = (searchInput) => {
    const lowerSearchInput = searchInput.toLowerCase();
    const filtered = allRoles.filter((job) =>
      job.name.toLowerCase().includes(lowerSearchInput)
    );
    setFilteredRoles(filtered);
  };

  const filterRolesBySkills = (skills) => {
    setSelectedSkills(skills);
    // Filter jobs based on selected skills
    const filtered = allRoles.filter((role) =>
      skills.every((skill) => role.skills.includes(skill))
    );
  };

  return (
    <div className="bg-[#bee9e8]">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-5 mb-1 text-center">
          Welcome {user.lname} {user.fname}{" "}
        </div>

        <RoleSearch
          handleSearching={handleSearching}
          handleSkillSearching={handleSkillSearching}
          filterRolesByName={filterRolesByName}
          filterRolesBySkills={filterRolesBySkills}
        ></RoleSearch>

        {isSearching || isSkillSearching ? null : (
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={allRoles.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}

        {isSearching || isSkillSearching ? (
          <div className="flex flex-col gap-4 mt-4">
            {filteredRoles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.name}
                description={role.description}
                department={role.department}
                jobLevel={role.jobLevel}
                wage={role.wage}
                skills={role.skills}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {currentRoles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.name}
                description={role.description}
                department={role.department}
                jobLevel={role.jobLevel}
                wage={role.wage}
                skills={role.skills}
              />
            ))}
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
