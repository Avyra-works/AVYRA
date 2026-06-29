import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      {/* Your Website */}
      <Analytics />
    </>
  );
}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;