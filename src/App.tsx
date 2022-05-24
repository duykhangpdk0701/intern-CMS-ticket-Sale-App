import React from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./App.less";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextRoute from "./Routes/ContextRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ContextRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
