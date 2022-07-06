import { appInsights } from './Telemetry';

import ReactDOM from 'react-dom/client';
import App from './App';

appInsights.loadAppInsights();
console.log("session_ID:", appInsights.context.getSessionId());
console.log("user_Id:", appInsights.context.user.id);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<App />
);
