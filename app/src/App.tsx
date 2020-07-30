import React from "react";
import GraphiQL from "graphiql";
import AuthProvider, { AuthProps } from "AuthProvider";
import "graphiql/graphiql.min.css";

const App: React.FC<AuthProps> = (props: AuthProps) => {
  /**
   * Overwrite the fetcher method to attach Bearer
   * token from Azure AD
   * @param graphQLParams
   */
  const fetcher = async (graphQLParams: any) => {
    const tokenResponse = await props.getToken();
    const data = await fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenResponse.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQLParams),
      credentials: "same-origin",
    });
    return data.json().catch(() => data.text());
  };

  if (!props.account) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <GraphiQL fetcher={fetcher}>
          <GraphiQL.Footer>
            <button
              onClick={props.onSignOut}
              style={{ width: "100%", margin: "10px", padding: "5px" }}
            >
              Current logged in as {props.account["name"]}
              <br />
              <b>Sign in with different Azure AD account</b>
            </button>
          </GraphiQL.Footer>
        </GraphiQL>
      </React.Fragment>
    );
  }
};

export default AuthProvider(App);
