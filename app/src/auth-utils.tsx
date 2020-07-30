/**
 * Adapted from official MSAL library:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-core-samples/react-sample-app
 */
import { UserAgentApplication, Logger } from "msal";

export const requiresInteraction = (errorMessage: any) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") > -1 ||
    errorMessage.indexOf("interaction_required") > -1 ||
    errorMessage.indexOf("login_required") > -1
  );
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;
  return msie || msie11;
};

export const API_REQUESTS = {
  PRIVATE: {
    scopes: [process.env.REACT_APP_API_SCOPE],
  },
};

export const current_url =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port;

export const msalApp = new UserAgentApplication({
  auth: {
    authority: process.env.REACT_APP_AUTHORITY,
    clientId: process.env.REACT_APP_CLIENTID,
    redirectUri: current_url,
    validateAuthority: true,
    postLogoutRedirectUri: current_url,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isIE(),
  },
  system: {
    navigateFrameWait: 500,
    logger: new Logger((logLevel: any, message: any) => {
      // console.log(message);
    }),
    telemetry: {
      applicationName: "GraphiQL-Azure-AD",
      applicationVersion: "0.1.0",
      telemetryEmitter: (events: any) => {
        // console.log("Telemetry Events:", events);
      },
    },
  },
});
