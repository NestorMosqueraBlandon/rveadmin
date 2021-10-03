import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import ChatScreen from './screens/EnterpriseScreens/ChatScreen';
import TaskScreen from './screens/EnterpriseScreens/TaskScreen';
import CategoryScreen from './screens/HardwareScreens/CategoryScreen';
import ComputerScreen from './screens/HardwareScreens/ComputerScreen';
import ProductScreen from './screens/HardwareScreens/ProductScreen';
import QuotationScreen from './screens/HardwareScreens/QuotationScreen';
import QuotationsDetailsScreen from './screens/HardwareScreens/QuotationsDetailsScreen';
import QuotationsScreen from './screens/HardwareScreens/QuotationsScreen';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/LoginScreens/SigninScreen';
import SignupScreen from './screens/LoginScreens/SignupScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="App">
        {userInfo ? (
          <Layout>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/categories" component={CategoryScreen}></Route>
            <Route path="/products" component={ProductScreen}></Route>
            <Route path="/computers" component={ComputerScreen}></Route>
            <Route path="/quotation" component={QuotationScreen} exact></Route>
            <Route
              path="/quotations"
              component={QuotationsScreen}
              exact
            ></Route>
            <Route
              path="/quotation/:id"
              component={QuotationsDetailsScreen}
            ></Route>
            <Route path="/task" component={TaskScreen} exact></Route>
            <Route path="/chat" component={ChatScreen} exact></Route>
          </Layout>
        ) : (
          <>
            <Redirect to="/" />
            <Route path="/" component={SigninScreen} exact></Route>
            <Route path="/register" component={SignupScreen} exact></Route>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
