import React, { useState, useEffect, useContext } from "react";
import RoleSearch from "../components/roleSearch";
import RoleCard from "../components/roleCard";

const HrHomePage = () => {
    return(
        <div className="bg-[#bee9e8]">
            <div className="container mx-auto p-2">
                <div className="font-bold text-3xl pt-10 mb-1 text-center">Welcome %name%</div>
                <RoleSearch></RoleSearch>
                <div className="p-2"></div>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
                {/* <div className="p-2"></div> */}
            </div>
        </div>
    );
};
export default HrHomePage;