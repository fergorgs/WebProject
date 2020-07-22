import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import ClientScreen from './components/ClientScreen'
import AdminScreen from './components/AdminScreen'
import AdminLoginScreen from './components/main/AdminLoginScreen'
import ClientLoginScreen from './components/main/ClientLoginScreen'
import ClientCreateScreen from './components/main/ClientCreateScreen'
import PermissionProvider from './components/contexts/PermissionContext'

function App() {
  //const { path, url } = useRouteMatch()

  return (
    <PermissionProvider>
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
    </PermissionProvider>
  )
}

export default withRouter(App)
