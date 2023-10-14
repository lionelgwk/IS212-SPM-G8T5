import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";

const ManagerProfilePage = () => {



    return(
        <div className="bg-white">
            <div className="container mx-auto p-2">
                <ProfileCard></ProfileCard>
                <SkillCard></SkillCard>
            </div>
        </div>
    );
};
export default ManagerProfilePage;