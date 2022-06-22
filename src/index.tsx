import { Config } from 'chessground/config';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import App from './App';
import ChBoard from './flashcard/ChBoard';


const appInsights = new ApplicationInsights({ config: {
  connectionString: 'InstrumentationKey=581aea48-e33e-41ee-b35c-3d10f48a8a99;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/'
  /* ...Other Configuration Options... */
} });
appInsights.loadAppInsights();
appInsights.trackEvent({name: "Index"});

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
