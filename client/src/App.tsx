import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import DataForm from "./pages/DataForm.tsx";
// import styles from "./styles/Home.module.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate("/test");
  };

  return (
    <div>
      <button className="homeButton" onClick={onClick}>
        test
      </button>
      <main>
        <Routes>
          <Route path="/test" element={<DataForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
