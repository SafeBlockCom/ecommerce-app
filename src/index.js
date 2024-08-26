// @flow

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Detector } from "react-detect-offline";
import { store, persistor } from "./store";
import App from "./App.react";
import { Provider as P, ErrorBoundary } from "@rollbar/react";
// import { unregister } from "./ServiceWorker";
import { internetConnectionHandler } from "./hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// same configuration you would create for the Rollbar.js SDK
const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.REACT_APP_ENVIRONMENT,
  },
};
// Your Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const container = document.getElementById("root");

// Create a root.
const root = createRoot(container);

// Initial render: Render an element to the root.
if (root) {
  root.render(
    <React.StrictMode>
      <P config={rollbarConfig}>
        <Provider store={store}>
          <ErrorBoundary>
            <PersistGate loading={null} persistor={persistor}>
              <Detector
                render={({ online }) => {
                  internetConnectionHandler(online);
                  return (
                    <Elements stripe={stripePromise}>
                      <App />
                    </Elements>
                  );
                }}
              />
            </PersistGate>
          </ErrorBoundary>
        </Provider>
      </P>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element to mount to!");
}
