import React, {Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckOutPage from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/sign-in_and_sign-up/signin-and-signup.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends Component {

  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async  userAuth => {
      // this.setState({currentUser: user});

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          
          this.props.setCurrentUser({
            
              id: snapShot.id,
              ...snapShot.data()            
          })
        });
        // console.log(this.state);
      }
      this.props.setCurrentUser(userAuth);
      //createUserProfileDocument(userAuth);
      
      console.log(this.currentUser);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
       
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} /> 
          <Route exact path='/checkout' component={CheckOutPage} /> 
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
                      
        </Switch>   
      </div>
    );
  }
  
}

const mapStaeToProps = state => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStaeToProps ,mapDispatchToProps)(App);
