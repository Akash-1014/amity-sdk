import { Client, API_REGIONS } from '@amityco/ts-sdk';

// Only required to do once in the lifetime of the application
Client.createClient('b0e8bb583e88a5374e308415550810dcd30888e4ec346e2a', API_REGIONS.SG); // SG is the default

/*
 *  Check the session handler section in session state core concept for full details
 */
const sessionHandler: Amity.SessionHandler = {
  sessionWillRenewAccessToken(renewal: Amity.AccessTokenRenewal) {
    // for details on other renewal methods check session handler
    renewal.renew();
  },
};

(async () => {
  const isConnected = await Client.login(
    {
      userId: 'my-user-id',
      displayName: 'my-display-name', // optional
      authToken: '', // only required if using secure mode
    },
    sessionHandler,
  );
})();