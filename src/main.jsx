import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import Login from './pages/Login.jsx';
import Agenda from './pages/Agenda.jsx';
import HistorialClinico from './pages/HistorialClinico.jsx';
import RecetaPreview from './pages/RecetaPreview.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/historial/:dni" element={<HistorialClinico />} />
        <Route path="/receta" element={<RecetaPreview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);