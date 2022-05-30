import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import About from '../pages/About';
import Report from '../pages/Report';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/product" component={Product} />
    <Route path="/about" component={About} />
    <Route path="/report" component={Report} />

  </Switch>
);

export default Routes;
