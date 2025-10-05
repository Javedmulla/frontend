import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartGame from "./pages/StartGame";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/dashboard/:gameId" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
