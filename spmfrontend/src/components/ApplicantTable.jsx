import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import FetchListingApplicants from "../hook/FetchListingApplicants";
import { useParams } from "react-router-dom";
import FetchSkillFilters from "../hook/FetchSkillFilters";
import AcceptModal from "./AcceptModal";

const ApplicantTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const role_listing_id = useParams().id;

  const { data: data, isPending: loading } =
    FetchListingApplicants(role_listing_id);

  const { data: skillFilters } = FetchSkillFilters();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => `${name.fname} ${name.lname}`,
    },
    {
      title: "Dept",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skills",
      key: "skills",
      dataIndex: "skills",
      filters: skillFilters,
      filteredValue: filteredInfo.skills || null,
      onFilter: (value, record) => record.skills.includes(value),
      render: (_, { skills }) => (
        <>
          {skills.length > 0 ? (
            skills.map((skill) => {
              let color = skill.length > 5 ? "geekblue" : "green";
              if (skill === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={skill}>
                  {skill.toUpperCase()}
                </Tag>
              );
            })
          ) : (
            <p className="text-gray-400">No skills recorded.</p>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "role_app_status",
      key: "role_app_status",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex justify-center">
          {record.role_app_status == "applied" ? (
            <AcceptModal className="text-blue-700" role_listing_id={role_listing_id} fname={record.name.fname} lname={record.name.lname} >
              Accept {record.name.fname} {record.name.lname}
            </AcceptModal>
          ) : (
            <p className="text-gray-400">Withdrawn</p>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        loading={loading}
      />
    </>
  );
};
export default ApplicantTable;
