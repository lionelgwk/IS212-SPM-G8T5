import React, { useState, useEffect, useContext } from "react";
import RoleSearch from "../components/roleSearch";
import RoleCard from "../components/roleCard";
import FetchUser from "../hook/FetchUser";

const HomePage = () => {
    const { user } = FetchUser();
    return(
        <div className="bg-[#bee9e8]">
            <div className="font-bold text-xl pt-5 mb-1 text-center">Welcome %name% </div>
            <RoleSearch></RoleSearch>
            <div className="p-2"></div>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
            <RoleCard></RoleCard>
        </div>
    );
};
export default HomePage;