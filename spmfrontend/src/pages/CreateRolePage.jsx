import React, { useState, useEffect, useContext } from "react";
import RoleListingForm from "../components/RoleListingForm";

const CreateRolePage = () => {
    return(
        <div>
            <div className="container mx-auto p-2">
                <RoleListingForm />
            </div>
        </div>
    );
};
export default CreateRolePage;