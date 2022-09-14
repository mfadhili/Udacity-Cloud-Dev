import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from "./serviceWorker";
//import * as semantic-ui-css from "semantic-ui-css";
import { makeAuthRouting } from "./routing";

ReactDOM.render(makeAuthRouting(), document.getElementById('root'))

serviceWorker.unregister()