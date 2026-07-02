import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
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
                <Suspense fallback={
                  <div className="h-screen w-screen bg-background flex items-center justify-center font-body text-xs font-bold uppercase tracking-widest text-accent-gold">
                    Loading Details...
                  </div>
                }>
                  <ProjectDetail />
                </Suspense>
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