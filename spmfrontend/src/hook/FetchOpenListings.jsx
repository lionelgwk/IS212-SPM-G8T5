import { useEffect, useState } from "react";

const FetchOpenListings = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchOpenRoles = async () => {
    const response = await fetch(`http://127.0.0.1:5050/listing/open_roles`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      setPending(true);
      try {
        let hookData = [];
        const backendDataAPI = await fetchOpenRoles();
        
        const backendData = backendDataAPI.data;
        // console.log(backendData)
        for (let i = 0; i < backendData.length; i++) {
            // console.log(backendData.data[i]);
            hookData.push({
                role_id: backendData[i].role_id,
                role_listing_close: backendData[i].role_listing_close,
                role_listing_creator: backendData[i].role_listing_creator,
                role_listing_desc: backendData[i].role_listing_desc,
                role_listing_id: backendData[i].role_listing_id,
                role_listing_open: backendData[i].role_listing_open,
                role_listing_source: backendData[i].role_listing_source,
                role_listing_ts_create: backendData[i].role_listing_ts_create,
                role_listing_ts_update: backendData[i].role_listing_ts_update,
                role_listing_updater: backendData[i].role_listing_updater,
                role_name: backendData[i].role_name,
                role_skills: backendData[i].role_skills,
            });
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

export default FetchOpenListings;
