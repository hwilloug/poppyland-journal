import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"
import { Provider } from "react-redux"
import "./index.css"
import { store } from "./store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_LOGIN_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: `${window.location.origin}diary/dashboard`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
