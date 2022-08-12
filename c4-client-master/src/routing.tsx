import React from 'react'
import Auth from './auth/Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
import {createBrowserHistory} from 'history'
import App from './App';
const historyy = createBrowserHistory()

const auth = new Auth(historyy)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeAuthRouting = () => {
  return (
    <Router history={historyy}>
      <div>
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props)
            return <Callback />
          }}
        />
        <Route
          render={props => {
            return <App auth={auth} {...props} />
          }}
        />
      </div>
    </Router>
  )
}
