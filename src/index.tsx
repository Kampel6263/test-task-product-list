import React from 'react';
import './app/styles/main.scss';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { State } from '@redux/config';
import { createBrowserHistory } from 'history';
import { Routes } from './app/modules/routes';
import { createStore } from './app/business-logic/redux';
import { getAllEl } from './app/business-logic/redux/store';
import { Preloader } from './app';
import { ErrorBoundary } from './app/core/components/error-boundary/error-boundary.component';

const history = createBrowserHistory();
const store = createStore(history);
/**
 * App content
 */
const AppContent: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.general);

  React.useEffect(() => {
    dispatch(getAllEl({ id: 's' }));
  }, []);

  // if (!data.length) {
  //   return <Preloader isActive />;
  // }
  return <React.Fragment>{children}</React.Fragment>;
};
/**
 * App root
 */
export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AppContent>
        <Router history={history}>
          <Routes />
        </Router>
      </AppContent>
    </Provider>
  </ErrorBoundary>
);

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
