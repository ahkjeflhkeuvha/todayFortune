import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useState } from "react";

function Result() {
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.userInfo !== undefined) {
      console.log(cookies.userInfo);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/test", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Result</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Result;
