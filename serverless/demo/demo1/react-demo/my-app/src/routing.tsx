import React from 'react'
import Auth from './auth/Auth'
import { Router, Route, BrowserRouter} from 'react-router-dom'
import Callback from './components/Callback'
//import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from "history";
import App from './App';
//const history = createHistory()
//import * as createhistory from "create-history";
//const history = createhistory.createHistory()

const history = createBrowserHistory();

const auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeAuthRouting = () => {
  return (
    <BrowserRouter>
      <div>
        <Route
          path="/callback" element = {<Callback/>}

        />
        <Route path='/' element = {<App auth={auth} history={history}/>}
        />
      </div>
    </BrowserRouter>
  )
}
