import React from "react";
import { useParams } from "react-router-dom";
import FetchUser from "../hook/FetchUser";

const HrListingDetailsPage = () => {

    const { id } = useParams();
    const { user } = FetchUser();

    return(
        <div>
            <h1>Detailed Page for Listing {id}</h1>
        </div>
    );
};
export default HrListingDetailsPage;