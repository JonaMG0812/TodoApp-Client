import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import { ProvideAuth } from "./Hooks/useProvideAuth";
import LoginClient from "./Components/Login";
import TodoApp from "./Components/Todo";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <LoginClient />
            </Route>
            <PrivateRoute path="/todo-app">
              <TodoApp />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
