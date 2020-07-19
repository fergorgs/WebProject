import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import ClientScreen from './components/ClientScreen'
import AdminScreen from './components/AdminScreen'
import AdminLoginScreen from './components/main/AdminLoginScreen'
import ClientLoginScreen from './components/main/ClientLoginScreen'
import ClientCreateScreen from './components/main/ClientCreateScreen'

function App() {
  //const { path, url } = useRouteMatch()

  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path='/'>
          <Redirect to={'/login/client'} />
        </Route>
        <Route path='/admin' component={AdminScreen} />
        <Route path='/client' component={ClientScreen} />
        <Route path={`/login/admin`} component={AdminLoginScreen} />
        <Route path={`/login/client`} component={ClientLoginScreen} />
        <Route path={`/login/create`} component={ClientCreateScreen} />
      </Switch>
    </div>
  )
}

export default withRouter(App)
