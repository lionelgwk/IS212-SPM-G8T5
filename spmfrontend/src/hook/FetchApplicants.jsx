import { useEffect, useState } from "react";

const FetchApplicants = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = async () => {
    const response = await fetch(
      `http://localhost:5050/listing/applicants/${id}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      setPending(true);
      try {
        let hookData = [];
        const backendDataAPI = await fetchApplicants();

        const backendData = backendDataAPI.data;
        // console.log(backendData)
        for (let i = 0; i < backendData.length; i++) {
          // console.log(backendData.data[i]);
          if (backendData[i].skill_status === "active") {
            hookData.push({
                role_app_id: backendData[i].role_app_id,
                role_app_status: backendData[i].role_app_status,
                role_app_ts_create: backendData[i].role_app_ts_create,
                role_listing_id: backendData[i].role_listing_id,
                staff_id: backendData[i].staff_id,
            });
          }
        }

        setData(hookData);
        setError(null);
        setPending(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { data, pending, error };
};

export default FetchApplicants;
