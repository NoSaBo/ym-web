import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import decode from "jwt-decode";
import Login from "views/AdminPage/Sections/Login/Login.jsx";

const client = new ApolloClient({
  // uri: "https://vp-project.herokuapp.com/graphql"
  uri: "http://localhost:4000/graphql"
});

var hist = createBrowserHistory();

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
}

function PrivateRoute({ component: Component, ...rest }) {
  console.log("rest", rest)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
      <Route
              exact
              path="/login"
              name="Login"
              component={Login}
            />
        {indexRoutes.map((prop, key) => {
          return (
            <PrivateRoute
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
