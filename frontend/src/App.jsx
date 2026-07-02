import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />
          <Route 
            path="/project/:slug" 
            element={
              <MainLayout>
                <ProjectDetail />
              </MainLayout>
            } 
          />
        </Routes>
      </BrowserRouter>

      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;