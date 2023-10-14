import React from 'react';
import { useParams } from 'react-router-dom';
import ApplicantSearch from '../components/applicantSearch';
import ApplicantCard from '../components/applicantCard';

const HrApplicantsPage = () => {

    const { id } = useParams();

    return (
        <div className="bg-[#bee9e8]">
            <div className="container mx-auto p-2">
                <div className="font-bold text-xl pt-10 mb-4 text-center">Applicants for Listing {id}</div>
                <ApplicantSearch />
                <div className="p-2"></div>

                {/* Row with headings */}
                <div className="grid grid-cols-6 gap-4 font-bold mb-2">
                    <div className="col-span-1 text-center">Applicant Id</div>
                    <div className="col-span-1 text-center">Name</div>
                    <div className="col-span-1 text-center">Applied date</div>
                    <div className="col-span-1 text-center">Role applied</div>
                    <div className="col-span-1 text-center">Skills match %</div>
                    <div className="col-span-1 text-center">View details</div>
                </div>

                {/* ApplicantCard */}
                <ApplicantCard
                    applicant={{
                        id: 1,
                        name: 'John Doe',
                        designation: 'Software Engineer',
                        appliedDate: '2023-09-30',
                        roleApplied: 'Full Stack Developer',
                        skillsMatch: 80,
                    }}
                />

                <ApplicantCard
                    applicant={{
                        id: 1,
                        name: 'John Doe',
                        designation: 'Software Engineer',
                        appliedDate: '2023-09-30',
                        roleApplied: 'Full Stack Developer',
                        skillsMatch: 80,
                    }}
                />

                <ApplicantCard
                    applicant={{
                        id: 1,
                        name: 'John Doe',
                        designation: 'Software Engineer',
                        appliedDate: '2023-09-30',
                        roleApplied: 'Full Stack Developer',
                        skillsMatch: 80,
                    }}
                />
            </div>
        </div>
    );
}

export default HrApplicantsPage;
