import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import Main from 'containers/main';
import Login from 'containers/auth/Login';
import Register from 'containers/auth/Register';
import Dashboard from 'containers/dashboard';
import Category from './containers/categories';
import Transactions from './containers/transactions';
import PieChart from './containers/piechart';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
        
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/transaction" component={Transactions} />
            <Route exact path="/monthly-summary" component={PieChart} />
            <Route exact path="/home" component={Main} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
