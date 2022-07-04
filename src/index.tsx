import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appInsights } from './Telemetry';
import App from './App';
import ChBoard from './flashcard/ChBoard';

console.log("session_ID:", appInsights.context.getSessionId());
console.log("user_Id:", appInsights.context.user.id);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = { <App /> } />
      <Route path = "*" element = { <h1>404</h1> } />
    </Routes>
  </BrowserRouter>
);
