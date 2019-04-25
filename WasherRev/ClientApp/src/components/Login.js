import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { signIn } from '../actions/LoginActions';

class Login extends React.Component{

    onSubmit = async (e) => {
       e.preventDefault();

       this.props.signIn({
           login: e.target.elements.login.value,
           password: e.target.elements.login.value 
       })
    }


    render(){
        return (
            <div className="wrapper fadeInDown">
            <div id="formContent">
                <br />
                <form onSubmit={this.onSubmit}>
                <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" />
                <input type="submit" className="fadeIn fourth" value="Log In" />
                </form>
            </div>
            </div>
        );
    }

}

export default connect(null, { signIn })(Login);