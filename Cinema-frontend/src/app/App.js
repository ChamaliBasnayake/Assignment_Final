import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import MovieList from '../movie/MovieList';
import SeatList from '../seat/SeatList';
import NewMovie from '../movie/NewMovie';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import NewHall from '../hall/NewHall';
import ViewHall from '../hall/ViewHall';
import ViewOrder from '../order/ViewOrder';
import UpdateMovie from '../movie/UpdateMovie';
import UpdateHall from '../hall/UpdateHall';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Cinema Application',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Cinema Application',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" 
                  render={(props) => <MovieList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/movie/new" component={NewMovie} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/movie/update/:id" component={UpdateMovie} handleLogout={this.handleLogout}></PrivateRoute>    
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/hall/new" component={NewHall} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/hall/view" component={ViewHall} handleLogout={this.handleLogout}></PrivateRoute>  
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/hall/update/:id" component={UpdateHall} handleLogout={this.handleLogout}></PrivateRoute>  
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/seat/view" component={SeatList} handleLogout={this.handleLogout}></PrivateRoute>  
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/order/view" component={ViewOrder} handleLogout={this.handleLogout}></PrivateRoute>       
                <Route component={NotFound}></Route>              
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
