import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export const appInsights = new ApplicationInsights({ config: {
    connectionString: 'InstrumentationKey=581aea48-e33e-41ee-b35c-3d10f48a8a99;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/'
    /* ...Other Configuration Options... */
  } 
});