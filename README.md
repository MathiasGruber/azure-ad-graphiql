# Azure AD GraphiQL

A quick wrapping of [GraphiQL](https://github.com/graphql/graphiql) to link up with Azure AD and attach bearer tokens to all requests sent to an API exposed on Azure.

# Running with Docker

First setup an Azure AD app registration for GraphiQL (or re-use an app registration for your frontend): `[Portal](https://portal.azure.com/) > Azure Active Directory > App Registrations`. Important notes:

- The app registration must include a redirect URI matching GraphiQL URI, e.g. `http://localhost:4444` in examples below

After this, you will need to retrieve:

- The `Application (client) ID`
- The authority, e.g. `https://login.microsoftonline.com/common`
- The scope of the backend API on Azure, e.g. `api://3p9r8f2r-r2-r-g34tf4f34f/user_impersonation` with appropriate permissions (e.g. `User.Read`)

Once you have these, and you know the `API_ENDPOINT` (i.e. where to send requests), you can launch this app with (all IDs below are fake):

```
docker run -it -p4444:3000 \
    --env REACT_APP_API_ENDPOINT=http://localhost:8000/api \
    --env REACT_APP_API_SCOPE=api://3p9r8f2r-r2-r-g34tf4f34f/user_impersonation \
    --env REACT_APP_CLIENTID=rf3io2gr-23r3-r32r3f-f233- \
    --env REACT_APP_API_SCOPE=rf3io2gr-23r3-r32r3f-f233- \
    --env REACT_APP_AUTHORITY=https://login.microsoftonline.com/common \
    -v $(pwd)/app:/app \
    nanomathias/graphiql_azure_ad
```

Go to `http://localhost:4444`

# Run Locally

## Using docker

The following is an example of how to build & run docker container locally:

```
# Build docker image
docker build --tag azure-ad-graphiql .

# Run docker image with appropriate env variables (example shown)
docker run -it -p4444:3000 \
    --env REACT_APP_API_ENDPOINT=http://localhost:8000/api \
    --env REACT_APP_API_SCOPE=api://3p9r8f2r-r2-r-g34tf4f34f/user_impersonation \
    --env REACT_APP_CLIENTID=rf3io2gr-23r3-r32r3f-f233- \
    --env REACT_APP_API_SCOPE=rf3io2gr-23r3-r32r3f-f233- \
    --env REACT_APP_AUTHORITY=https://login.microsoftonline.com/common \
    -v $(pwd)/app:/app \
    azure-ad-graphiql
```

Go to `http://localhost:4444`

## Using yarn

Use the following to launch the app with yarn

```
cd app
yarn install
yarn start
```

Go to `http://localhost:4444`

# Acknoledgements

- [CRA example from graphiql](https://github.com/graphql/graphiql/tree/main/examples/graphiql-create-react-app)
- [auth-graphiql package](https://github.com/vitalcode/auth-graphiql)
