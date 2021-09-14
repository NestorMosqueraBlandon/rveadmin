import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import CategoryScreen from './screens/HardwareScreens/CategoryScreen';
import ProductScreen from './screens/HardwareScreens/ProductScreen';
import SigninScreen from './screens/LoginScreens/SigninScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="App">
        {userInfo ? (
          <Layout>
            <Route path="/categories" component={CategoryScreen}></Route>
            <Route path="/products" component={ProductScreen}></Route>
          </Layout>
        ) : (
          <>
            <Redirect to="/" />
          </>
        )}
        <Route path="/" component={SigninScreen} exact></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
