import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";
import FetchUser from "../hook/FetchUser";

const StaffProfilePage = () => {
    const { user } = FetchUser();



    return(
        <div className="bg-[#f8fdff] h-screen">
            <div className="container mx-auto p-2">
                <div className="font-bold text-xl pt-10 mb-1 text-center">My Profile</div>
                <ProfileCard></ProfileCard>
                <SkillCard></SkillCard>
            </div>
        </div>
    );
};
export default StaffProfilePage;