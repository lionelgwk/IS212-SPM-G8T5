import React from 'react';
import ApplicantSearch from '../components/applicantSearch';
import ApplicantCard from '../components/applicantCard';

const ApplicantsPage = () => {
    return (
        <div className="bg-[#bee9e8]">
            <div className="font-bold text-xl pt-5 mb-1 text-center">Applicants</div>
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
    );
}

export default ApplicantsPage;