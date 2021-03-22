import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';

import { ThemeProvider } from 'styled-components';
import { useTheme } from './Hooks/theme';
import { play, exit } from './utils/timelines';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Products from './Pages/Products';
// import Checkout from './Pages/Checkout';
import CheckoutTest from './Pages/CheckoutTest';
import MyOrders from './Pages/OrderDetails';
import OrderDetails from './Pages/MyOrders';
import AdminProfile from './Pages/AdminProfile';
import AdminOrders from './Pages/AdminOrders';

const Routes = () => {
  const { theme } = useTheme();

  return (
    <div className="app">
      <Route
        render={ ({ location }) => {
          const { pathname, key } = location;

          return (
            <TransitionGroup component={ null }>
              <Transition
                key={ key }
                appear
                onEnter={ (node, appears) => play(pathname, node, appears) }
                onExit={ (node, appears) => exit(node, appears) }
                timeout={ { enter: 500, exit: 150 } }
              >
                <ThemeProvider theme={ theme }>
                  <Switch location={ location }>
                    <Route
                      exact
                      path="/"
                      component={ () => <Redirect to="/login" /> }
                    />
                    <Route path="/login" component={ Login } />
                    <Route path="/register" component={ Register } />
                    <Route path="/profile" component={ Profile } />
                    <Route path="/products" component={ Products } />
                    <Route path="/checkout" component={ CheckoutTest } />
                    <Route exact path="/orders" component={ OrderDetails } />
                    <Route path="/orders/:id" component={ MyOrders } />
                    <Route path="/admin/profile" component={ AdminProfile } />
                    <Route path="/admin/orders" component={ AdminOrders } />
                  </Switch>
                </ThemeProvider>
              </Transition>
            </TransitionGroup>
          );
        } }
      />
    </div>
  );
};

export default Routes;
