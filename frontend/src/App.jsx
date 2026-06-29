import React from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      {/* Your Website */}
      <Analytics />
    </>
  );
}

function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
