import React, { useState, useEffect, useContext } from "react";
import RoleSearch from "../components/roleSearch";
import RoleCard from "../components/roleCard";
import FetchUser from "../hook/FetchUser";

const ManagerHomePage = () => {
    const { user } = FetchUser();
    return(
        <div className="bg-[#bee9e8] h-screen">
            <div className="container mx-auto p-2">
                <div className="font-bold text-xl pt-5 mb-1 text-center">Welcome {user.lname} {user.fname} , {user} </div>
                <RoleSearch></RoleSearch>
                <div className="p-2"></div>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
                <RoleCard></RoleCard>
            </div>
        </div>
    );
};
export default ManagerHomePage;