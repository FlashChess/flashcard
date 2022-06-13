import { Config } from 'chessground/config';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/flashcard" element = { <App /> } />
        <Route path = "*" element = { <h1>404</h1> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
