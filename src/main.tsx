import React, { Suspense } from 'react'; // Import React and Suspense
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Import the i18n configuration

// Get the root element
const container = document.getElementById('root');
if (!container) {
  throw new Error("Root element with id 'root' not found in the document.");
}

// Create a root
const root = createRoot(container);

// Render the app within Suspense for i18n loading
root.render(
  <React.StrictMode>
    <Suspense fallback="Loading..."> {/* Add a loading fallback */}
      <App />
    </Suspense>
  </React.StrictMode>
);
