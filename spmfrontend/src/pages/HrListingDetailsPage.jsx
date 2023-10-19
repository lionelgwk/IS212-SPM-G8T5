import React from "react";
import { useParams } from "react-router-dom";
import Viewdetails from "../components/viewDetails";
import FetchUser from "../hook/FetchUser";


const HrListingDetailsPage = () => {

    const { id } = useParams();
    const { user } = FetchUser();

    return(
        <div className="bg-[#bee9e8] h-screen">
            <div className="container mx-auto p-2">
                <Viewdetails />
            </div>
        </div>
    );
};
export default HrListingDetailsPage;