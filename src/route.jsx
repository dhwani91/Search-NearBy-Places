import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import MainPage from './containers/HeroContainer.jsx';
let history = createBrowserHistory({
  // config if needed
});
const Routes = () => {
  return (
    <Router history={history}>
        <div className="main">
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route render={() => { return <p> Not Found</p>}} />
          </Switch>
        </div>
    </Router>
  );
};

export default Routes;
