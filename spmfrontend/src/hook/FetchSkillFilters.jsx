import { useEffect, useState } from "react";

const FetchSkillFilters = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    const response = await fetch(`http://127.0.0.1:5050/skill`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      setPending(true);
      try {
        let hookData = [];
        const backendDataAPI = await fetchSkills();

        const backendData = backendDataAPI.data;
        // console.log(backendData)
        for (let i = 0; i < backendData.length; i++) {
          // console.log(backendData.data[i]);
          if (backendData[i].skill_status === "active") {
            hookData.push({
              text: backendData[i].skill_name,
              value: backendData[i].skill_name,
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

export default FetchSkillFilters;
