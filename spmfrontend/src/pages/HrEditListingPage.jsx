import React from 'react'
import HrEditListingForm from '../components/HrEditRoleListing'
import HrRoleCard from '../components/hrRoleCard'
import FetchListingDetails from '../hook/FetchListingDetails'
import { useParams } from 'react-router-dom'

const HrEditListingPage = () => {
  const { id } = useParams();
  const { data: listing, isPending: isPending } = FetchListingDetails(id);
  
  return (
    <div className="bg-[#bee9e8] h-screen">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-10 mb-4 text-center">Edit Listing</div>
        <HrEditListingForm id={id}/>
      </div>
  </div>
  )
}

export default HrEditListingPage