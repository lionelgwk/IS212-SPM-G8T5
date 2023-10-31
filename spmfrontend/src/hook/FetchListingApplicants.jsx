import { useEffect, useState } from "react";

const FetchListingApplicants = (role_listing_id) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = async (role_listing_id) => {
    const response = await fetch(
      `http://localhost:5050/listing/applicants/${role_listing_id}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async (role_listing_id) => {
      setData(null);
      setPending(true);
      try {
        let hookData = [];
        const backendDataAPI = await fetchApplicants(role_listing_id);

        const backendData = backendDataAPI.data;
        // console.log(backendData)
        for (let i = 0; i < backendData.length; i++) {
          // console.log(backendData.data[i]);
          hookData.push({
            role_app_id: backendData[i].role_app_id,
            role_app_status: backendData[i].role_app_status.charAt(0).toUpperCase() + backendData[i].role_app_status.slice(1),
            role_app_ts_create: backendData[i].role_app_ts_create,
            role_listing_id: backendData[i].role_listing_id,
            staff_id: backendData[i].staff_id,
          });
        }

        for (let i = 0; i < hookData.length; i++) {
          const response = await fetch(
            `http://localhost:5050/staff/${hookData[i].staff_id}`
          );
          const data = await response.json();
          hookData[i].name = {};
          hookData[i].name.fname = data.data.fname;
          hookData[i].name.lname = data.data.lname;
          hookData[i].dept = data.data.dept;
          hookData[i].email = data.data.email;
          hookData[i].phone = data.data.phone;
          hookData[i].skills = [];
          for (let j = 0; j < data.data.active_skills.length; j++) {
            if (data.data.active_skills[j].skill_status === "active") {
              hookData[i].skills.push(data.data.active_skills[j].skill_name);
            }
          }
        }

        console.log(hookData);

        setData(hookData);
        setError(null);
        setPending(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData(role_listing_id);
  }, []);

  return { data, pending, error };
};

export default FetchListingApplicants;
