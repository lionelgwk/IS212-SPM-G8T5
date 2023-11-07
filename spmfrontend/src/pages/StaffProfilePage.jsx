import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";

const StaffProfilePage = () => {
    return(
        <div className="bg-[#bee9e8] h-screen">
            <div className="container mx-auto p-2">
                <div className="font-bold text-xl pt-10 mb-4 text-center">My Profile</div>
                <ProfileCard></ProfileCard>
                <SkillCard></SkillCard>
            </div>
        </div>
    );
};
export default StaffProfilePage;