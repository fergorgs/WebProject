import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import MainPage from "./components/MainPage";
import ClientScreen from "./components/ClientScreen";
import AdminScreen from './components/AdminScreen'

export default function App() {
  
  //const { path, url } = useRouteMatch()
  
  return (

    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Redirect to={"/login"}/>
          </Route>
          <Route path="/admin" component={AdminScreen}/>
          <Route path="/client" component={ClientScreen}/>
          <Route path="/login" component={MainPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
