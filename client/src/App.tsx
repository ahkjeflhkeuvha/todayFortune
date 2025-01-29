import React from "react";
import { Route, Routes } from "react-router-dom";
import DataForm from "./pages/DataForm.tsx";
import Result from "./pages/Result.tsx";
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
          <Route path="/test/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
