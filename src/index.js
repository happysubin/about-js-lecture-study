import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import App from "./Components/App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//ApolloProvider 로 감싸줘야한다
