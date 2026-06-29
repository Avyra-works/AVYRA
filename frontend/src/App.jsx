import React from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <MainLayout>
        <Home />
      </MainLayout>

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;