import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import Dashboard from './components/Dashboard.jsx'
import Navbar from './components/Navbars.jsx';
import FAQform from './components/FAQform.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<FAQform />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
