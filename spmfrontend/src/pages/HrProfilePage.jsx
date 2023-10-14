import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";
import FetchUser from "../hook/FetchUser";

const HrProfilePage = () => {

    const { user } = FetchUser();
    return(
        <div className="bg-white">
            <div className="container mx-auto p-2">          
                <ProfileCard></ProfileCard>
                <SkillCard></SkillCard>
            </div>
        </div>
    );
};
export default HrProfilePage;