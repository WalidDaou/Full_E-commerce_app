import React from 'react';
import { Redirect, Route, HashRouter as Router, Switch, useHistory, RouteProps } from 'react-router-dom';
import './App.css';
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { useCommerceStore } from "./store";
import Review from "./components/Forms/Review";
import AddProduct from "./components/Forms/AddProduct";
import CreateStore from "./components/Forms/CreateStore";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { homeURL, superAdmins } from './shared/constants';
import AdminApprove from './components/Forms/AdminApprove';
import StoresList from './components/StoresList';

const App: React.FC = () => {
  const { token } = useCommerceStore();
  const history = useHistory();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Logout failed:', response.statusText);
        alert('You are not logged in');
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Logout successful');

      // Use history.push for programmatic redirection
      history.push('/login');
    } catch (error: any) {
      console.error('Error during logout:', error.message);
    }
  };

  const PrivateRoute: React.FC<{ component: React.ComponentType<any> } & RouteProps> = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token && superAdmins.includes(token.email) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  const AdminRoute: React.FC<{ component: React.ComponentType<any> } & RouteProps> = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token && token.email === "walid.daou@gamil.com" ? (
          <Redirect to="/admin-dashboard" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <div className="App">
      <Header onLogout={logout} />
      <FiltersBar />

      <Router>
        <Switch>

          {/* <PrivateRoute path="/admin-dashboard" component={AdminApprove} /> */}
          <AdminRoute path="/admin-dashboard" component={AdminApprove} />

          <Route path='/Login' exact component={Login} />
          <Route path='/Register' exact component={Register} />
          <Route path='/' exact component={ProductList} />
          <Route path='/store' exact component={StoresList} />
          <Route path='/store' exact component={CreateStore} />
          <Route path='/MyProduct' exact component={AddProduct} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
