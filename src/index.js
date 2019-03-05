import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./context/auth-context";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import AdminPage from "views/AdminPage/AdminPage.jsx";

const client = new ApolloClient({
  // uri: "https://vp-project.herokuapp.com/graphql"
  uri: "http://localhost:4000/graphql"
});

var hist = createBrowserHistory();

export const Context = React.createContext({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      username: null,
      tokenExpiration: null,
    };
  }
  login = (token, tokenExpiration, userId, username) => {
    this.setState({ token, tokenExpiration, userId, username });
  };

  logout = () => {
    this.setState({ token: null, userId: null, username: null });
  };
  render() {
    console.log("this.state", this.state);
    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            username: this.state.username,
            login: this.login,
            logout: this.logout
          }}
        >
          <Router history={hist}>
            <Switch>
              {!this.state.token && (
                <Redirect
                  from="/parkeo/admin-page"
                  to="/parkeo/admin-page/login"
                  exact
                />
              )}
              {this.state.token && (
                <Route path="/parkeo/admin-page" component={AdminPage} />
              )}
              ,
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
        </AuthContext.Provider>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
