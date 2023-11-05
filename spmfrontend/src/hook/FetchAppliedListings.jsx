import { useEffect, useState } from "react";

const FetchAppliedListings = (id) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppliedRoles = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:5050/listing/applied_roles/${id}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async (id) => {
      setData(null);
      setPending(true);
      try {
        let hookData = [];
        const backendDataAPI = await fetchAppliedRoles(id);

        const backendData = backendDataAPI.data;
        for (let i = 0; i < backendData.length; i++) {
          const roleDetailsDataAPIResponse = await fetch(`http://127.0.0.1:5050/listing/listed_roles/${backendData[i].role_listing_id}`);
          const roleDetailsDataAPI = await roleDetailsDataAPIResponse.json();
          const roleDetailsData = roleDetailsDataAPI.data;

          hookData.push({
            role_id: roleDetailsData.role_id,
            role_listing_close: roleDetailsData.role_listing_close,
            role_listing_creator: roleDetailsData.role_listing_creator,
            role_listing_desc: roleDetailsData.role_listing_desc,
            role_listing_id: backendData[i].role_listing_id,
            role_listing_open: roleDetailsData.role_listing_open,
            role_listing_source: roleDetailsData.role_listing_source,
            role_listing_ts_create: roleDetailsData.role_listing_ts_create,
            role_listing_ts_update: roleDetailsData.role_listing_ts_update,
            role_listing_updater: roleDetailsData.role_listing_updater,
            role_name: roleDetailsData.role_name,
            role_skills: roleDetailsData.role_skills,
            role_app_id: backendData[i].role_app_id,
            role_app_status: backendData[i].role_app_status,
            role_app_ts_create: backendData[i].role_app_ts_create,
          });
        }

        

        setData(hookData);
        setError(null);
        setPending(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData(id);
  }, []);

  return { data, pending, error };
};

export default FetchAppliedListings;
