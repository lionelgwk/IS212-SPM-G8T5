import React, { useState, useEffect, useContext } from "react";
import RoleListingForm from "../components/RoleListingForm";
import FetchUser from "../hook/FetchUser";

const CreateRolePage = () => {
    const { user } = FetchUser();
    return(
        <div className="bg-[#bee9e8] min-h-screen">
            <div className="container mx-auto p-2">
                <RoleListingForm />
            </div>
        </div>
    );
};
export default CreateRolePage;