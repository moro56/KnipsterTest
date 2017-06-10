import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App';
import EditCustomer from './EditCustomer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin();

const history = createBrowserHistory()

const Navigation = (
	<Router history={history}>
	  <Switch>
		    <Route exact path="/" component={App} />
		    <Route path="/edit" component={EditCustomer} />
	  </Switch>
	</Router>
);

ReactDOM.render(Navigation, document.getElementById('root'));
registerServiceWorker();
