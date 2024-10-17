import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './Auth';
import Dash from './Dash'

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
