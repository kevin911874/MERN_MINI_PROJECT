import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import BorrowForm from "./components/BorrowForm";
import PendingItems from "./pages/PendingItems";
import SubmittedItems from "./pages/SubmittedItems";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BorrowForm />} />
          <Route path="/pending" element={<PendingItems />} />
          <Route path="/submitted" element={<SubmittedItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
