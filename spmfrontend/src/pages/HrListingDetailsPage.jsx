import React from "react";
import { useParams } from "react-router-dom";
import Viewdetails from "../components/viewDetails";

const HrListingDetailsPage = () => {

    const { id } = useParams();

    return(
        <div className="bg-[#bee9e8]">
            <div className="container mx-auto p-2">
                <Viewdetails />
            </div>
        </div>
    );
};
export default HrListingDetailsPage;