import React from 'react';
import Login from './components/Login';
import { connect } from '../node_modules/react-redux';
import Home from './components/Home';
import Users from './components/Users';
import Layout from './components/Layout';
import { Route } from "react-router-dom";
import Building from './components/Building';
import Reservation from './components/Reservation';
import Producer from './components/Producer';
import Washer from './components/Washer';
import Room from './components/Room';
import HomeUser from './UserViews/Home';
import MyReservation from './UserViews/MyReservation';

class App extends React.Component{

    properView = () => {
        if (this.props.user.userId) {

            if (this.props.user.roleName === 'Admin') {
                return (
                    <Layout>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/building' component={Building} />
                        <Route exact path='/producer' component={Producer} />
                        <Route exact path='/reservation' component={Reservation}/>
                        <Route exact path='/washer' component={Washer} />
                        <Route exact path='/room' component={Room} />
                    </Layout>
                );
            }

            return (
                <Layout>
                    <Route exact path='/' component={HomeUser} />
                    <Route exact path='/reservation' component={HomeUser} />
                    <Route exact path='/myReservation' component={MyReservation} />
                </Layout>
            );

        }
        else {
            return <Login />
        }
    };

    render() {
        return (
            this.properView()
        );
    }

}

const mapStateToProps = (state) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(App);