import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../components/profileCard";
import SkillCard from "../components/skillCard";

const ManagerProfilePage = () => {



    return(
        <div className="bg-white">
            <ProfileCard></ProfileCard>
            <SkillCard></SkillCard>
        </div>
    );
};
export default ManagerProfilePage;