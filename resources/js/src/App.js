import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import useGlobalAuthUser from "./global_hooks/auth_user";
import PreviewPost from "./components/PreviewPost";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/post/:id">
            <PreviewPost />
          </Route>

          <PrivateRoute path="*" >
            <Switch>
              <Route path={`/home`}>
                <Home />
              </Route>
            </Switch>
          </PrivateRoute>

        </Switch>
      </div>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
  const [auth, authActions] = useGlobalAuthUser();
  let bearer_token = localStorage.getItem('bearer_token')

  useEffect(() => {
    const fetchAuthUser = async () => {
      await authActions.checkAuth()
      bearer_token = localStorage.getItem('bearer_token')
    }
    fetchAuthUser()
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        bearer_token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
