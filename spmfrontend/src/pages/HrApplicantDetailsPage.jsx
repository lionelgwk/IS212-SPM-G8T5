import React from 'react'
import { useParams } from 'react-router-dom';
import ViewApplicantDetails from '../components/viewApplicantDetails';

const HrApplicantDetailsPage = () => {
    const { staffid } = useParams();
  return (
    <div className="bg-[#bee9e8] h-screen">
        <div className="container mx-auto p-2">
            <ViewApplicantDetails />
        </div>
    </div>
  )
}

export default HrApplicantDetailsPage