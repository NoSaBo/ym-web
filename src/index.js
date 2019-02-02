import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  // uri: "https://vp-project.herokuapp.com/graphql"
  uri: 'http://localhost:4000/graphql'
});

var hist = createBrowserHistory();

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              exact
              path={prop.path}
              key={key}
              component={prop.component}
            />
          );
        })}
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
