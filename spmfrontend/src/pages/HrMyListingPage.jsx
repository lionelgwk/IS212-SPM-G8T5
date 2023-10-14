import React from 'react'
import HrRoleCard from '../components/hrRoleCard'

const HrMyListingPage = () => {
  return (
    <div className="bg-[#bee9e8] h-screen">
      <div className="container mx-auto p-2">
        <div className="font-bold text-xl pt-10 mb-4 text-center">My Listing</div>
        <HrRoleCard />
      </div>
  </div>
  )
}

export default HrMyListingPage