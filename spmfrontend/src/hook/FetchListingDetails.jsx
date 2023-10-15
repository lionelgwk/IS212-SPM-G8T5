import { useEffect, useState } from "react";

const FetchListingDetails = (id) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchListing = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:5050/listing/listed_roles/${id}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async (id) => {
      setData(null);
      setPending(true);
      try {
        const backendDataAPI = await fetchListing(id);

        const backendData = backendDataAPI.data;

        setData(backendData);
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

export default FetchListingDetails;
