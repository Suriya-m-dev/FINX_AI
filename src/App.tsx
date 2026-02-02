import React from "react";
import "../index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Finx from "./pages/Finx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Finx />} />
      </Routes>
    </Router>
  );
};

export default App;
