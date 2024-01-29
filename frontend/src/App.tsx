import React, { useEffect, useState } from 'react';
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
//@ts-ignore
import AdminApprove from './components/Forms/AdminApprove';
import StoresList from './components/StoresList';

const App: React.FC = () => {
  const { token, decodedToken, names } = useCommerceStore();
  const history = useHistory();
  const [admin, setAdmin] = useState('');

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
      alert(`user  ${decodedToken?.user.email} log out`);

      // Use history.push for programmatic redirection
      history.push('/login');
    } catch (error: any) {
      console.error('Error during logout:', error.message);
    }
  };

  const PrivateRoute: React.FC<{ component: React.ComponentType<any> } & RouteProps> = ({ component: AdminApprove, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token && superAdmins.includes(decodedToken?.user.email) ? (
          <AdminApprove {...props} />

        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  // const AdminRoute: React.FC<{ component: React.ComponentType<any> } & RouteProps> = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       token && token.email === "walid.daou@gamil.com" ? (
  //         <Redirect to="/" />
  //       ) : (
  //         <Redirect to="/product" />
  //       )
  //     }
  //   />
  // );

  const checkForChanges = () => {
    // Your logic to check for changes or perform some action
    // console.log('Checking for changes...');
    // For example, if myValue changes, do something
    if (token) {
      console.log(names);
      // alert(decodedToken?.user.email)
      setAdmin(decodedToken?.user.email);
    }

    // setTimeout(checkForChanges, 10000); // Set the timeout duration in milliseconds (e.g., 1000 ms = 1 second)
  };

  useEffect(() => {

    checkForChanges();

  }, [token]);

  return (
    <div className="App">
      <Header onLogout={logout} />
      <FiltersBar />

      <Router>
        <Switch>

          {/* 
          {token && superAdmins.includes(token.email) ? (
            <Route path="/admin" component={AdminApprove} />
          ) : null}
           */}

          {/* {admin && superAdmins.includes(admin) && (
            <Route path="/admin" exact component={AdminApprove} />
          )} */}


          {token ? <PrivateRoute path="/dashboard" component={AdminApprove} /> : null}
          <Route path='/Login' exact component={Login} />
          <Route path='/Register' exact component={Register} />
          <Route path='/products' exact component={ProductList} />
          <Route path='/stores' exact component={StoresList} />
          <Route path='/store' exact component={CreateStore} />
          <Route path='/MyProduct' exact component={AddProduct} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
