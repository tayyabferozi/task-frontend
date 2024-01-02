import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Add from "pages/Add";
import Listing from "pages/Listing";
import MainLayout from "layouts/MainLayout";
import Update from "pages/Update";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Add />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/:id" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
