import { appInsights } from './Telemetry';

import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import App from './App';
import Homepage from './Homepage';
import ChBoard from './app/flashcard/ChBoard';
import Test from "./app/Test";

appInsights.loadAppInsights();
console.log("session_ID:", appInsights.context.getSessionId());
console.log("user_Id:", appInsights.context.user.id);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<HashRouter>
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/flashcard" element={<App />} />
			<Route path="/chboard" element={<ChBoard />} />
			<Route path="/Test" element={<Test />} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
	</HashRouter>
);
