import React from "react";
import { useParams } from "react-router-dom";

const HrListingDetailsPage = () => {

    const { id } = useParams();

    return(
        <div>
            <h1>Detailed Page for Listing {id}</h1>
        </div>
    );
};
export default HrListingDetailsPage;