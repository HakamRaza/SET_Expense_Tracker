import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from 'containers/main';
import Login from 'containers/auth/Login';
import Register from 'containers/auth/Register';
import Dashboard from 'containers/dashboard';
import Category from './containers/categories';
import Transactions from './containers/transactions';
import PieChart from './containers/piechart';
// import About from './containers/dummy/About';
// import Contact from './containers/dummy/Contact';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/transaction" component={Transactions} />
          <Route exact path="/monthly-summary" component={PieChart} />
          {/* <Route exact path="/about" component={About} /> */}
          {/* <Route exact path="/about/#contact" component={Contact} /> */}
          <Route exact path="/home" component={Main} />
          <Route path="/" component={Main} />
          <Route />
          <Route />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
