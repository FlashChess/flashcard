import { Config } from 'chessground/config';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import ChBoard from './flashcard/ChBoard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/flashcard" element = { <App /> } />
      <Route path = "/chboard" element = { <ChBoard /> } />
      <Route path = "*" element = { <h1>404</h1> } />
    </Routes>
  </BrowserRouter>
);
