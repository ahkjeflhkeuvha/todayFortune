import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function Result() {
  const [cookies, setCookie] = useCookies(["userInfo"]);

  useEffect(() => {
    if (cookies.userInfo !== undefined) {
      console.log(cookies.userInfo);
    }
  }, []);

  return (
    <div>
      <h1>Result</h1>
    </div>
  );
}

export default Result;
