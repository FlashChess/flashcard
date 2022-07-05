import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import { appInsights } from './Telemetry';
import App from './App';

appInsights.loadAppInsights();
console.log("session_ID:", appInsights.context.getSessionId());
console.log("user_Id:", appInsights.context.user.id);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<HashRouter basename="/flashcard">
		<Routes>
			<Route path="/" element={<div><h1>Homepage</h1></div>} />
			<Route path="/flashcard" element={<App />} />
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
	</HashRouter>
);
