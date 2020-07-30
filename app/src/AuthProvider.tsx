/**
 * Adapted from official microsoft sample (30/7/2020):
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-core-samples/react-sample-app/src/AuthProvider.js
 */
import React, { Component } from "react";
import { msalApp, current_url, API_REQUESTS } from "auth-utils";

// If you support IE, our recommendation is that you sign-in using Redirect APIs
// const useRedirectFlow = isIE();
const useRedirectFlow = true;

export interface AuthProps {
  account: {};
  error: string;
  onSignIn: (useRedirectFlow: boolean) => void;
  onSignOut: () => void;
  getToken: () => any;
}

export default (C) =>
  class AuthProvider extends Component<{}, AuthProps> {
    constructor(props) {
      super(props);

      this.state = {
        account: null,
        error: null,
        onSignIn: null,
        onSignOut: null,
        getToken: null,
      };
    }

    async acquireToken(request, redirect) {
      return msalApp.acquireTokenSilent(request);
    }

    async getToken() {
      const tokenResponse = this.acquireToken(
        API_REQUESTS.PRIVATE,
        useRedirectFlow
      ).catch((e) => {
        this.setState({
          error: "Unable to acquire access token for calling API.",
        });
      });
      return tokenResponse;
    }

    async onSignIn(redirect) {
      if (redirect) {
        return msalApp.loginRedirect({
          redirectUri: current_url,
        });
      }

      const loginResponse = await msalApp.loginPopup().catch((error) => {
        this.setState({
          error: error.message,
        });
      });

      if (loginResponse) {
        this.setState({
          account: loginResponse.account,
          error: null,
        });
      }
    }

    onSignOut() {
      msalApp.logout();
    }

    componentDidMount() {
      msalApp.handleRedirectCallback((error) => {
        if (error) {
          const errorMessage = error.errorMessage
            ? error.errorMessage
            : "Unable to acquire access token.";
          // setState works as long as navigateToLoginRequestUrl: false
          this.setState({
            error: errorMessage,
          });
        }
      });
      // Get user account. If not signed in, force login!
      const account = msalApp.getAccount();
      if (account) {
        this.setState({ account });
      } else {
        this.onSignIn(true);
      }
    }

    render() {
      return (
        <C
          {...this.props}
          account={this.state.account}
          error={this.state.error}
          onSignIn={() => this.onSignIn(useRedirectFlow)}
          onSignOut={() => this.onSignOut()}
          getToken={() => this.getToken()}
        />
      );
    }
  };
