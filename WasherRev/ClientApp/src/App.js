import React from 'react';
import Login from './components/Login';
import { connect } from '../node_modules/react-redux';
import Home from './components/Home';
import Users from './components/Users';
import Layout from './components/Layout';
import { Route } from "react-router-dom";
import Building from './components/Building';
import Producer from './components/Producer';

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
                    </Layout>
                );
            }

            return (
                <div>no admin</div>
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