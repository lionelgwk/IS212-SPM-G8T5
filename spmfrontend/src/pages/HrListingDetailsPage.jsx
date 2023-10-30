import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Viewdetails from "../components/viewDetails";
import FetchUser from "../hook/FetchUser";
import FetchListingApplicants from "../hook/FetchListingApplicants";


const HrListingDetailsPage = () => {

    const { id } = useParams();
    const { user } = FetchUser();
    const { data: response } = FetchListingApplicants(101);

    return(
        <div className="bg-[#bee9e8] h-screen">
            <div className="container mx-auto p-2">
                <Viewdetails />
            </div>
        </div>
    );
};
export default HrListingDetailsPage;