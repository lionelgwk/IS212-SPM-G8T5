import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";
import FetchUser from "../hook/FetchUser";

const StaffProfilePage = () => {
    const { user } = FetchUser();



    return(
        <div className="bg-white">
            <ProfileCard></ProfileCard>
            <SkillCard></SkillCard>
        </div>
    );
};
export default StaffProfilePage;