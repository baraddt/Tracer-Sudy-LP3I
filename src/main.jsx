import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'; // Impor index css ini setelah import boostrap (Jika Menggunakan bosstrap seperti saya)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
