import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesProps } from './routes.props';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ '@modules/home'));
/**
 * Renders Routes
 */
const Routes: React.FC<RoutesProps> = () => (
  <div>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </React.Suspense>
  </div>
);

export { Routes };
