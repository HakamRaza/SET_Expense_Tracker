import React from 'react';
import Header from 'components/header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from 'containers/main';
import Login from 'containers/auth/Login';
import Register from 'containers/auth/Register';

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Main} />
          <Route />
          <Route />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
