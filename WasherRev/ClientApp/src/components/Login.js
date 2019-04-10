import React from 'react';
import './Login.css';

class Login extends React.Component{

    onSubmit = async (e) => {
       e.preventDefault();
       const url = `api/Users/Authenticate`;
       const response = await fetch(
           url,
           {
            method: 'post',
            body: JSON.stringify({
                Username: "admin",
                Password: "admin"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
           });
       const forecasts = await response;

       console.log(forecasts);


    }


    render(){
        return (
<div className="wrapper fadeInDown">
  <div id="formContent">

  <div className="fadeIn first">
      <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
    </div>

    <form onSubmit={this.onSubmit}>
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
      <input type="submit" className="fadeIn fourth" value="Log In" />
    </form>

    <div id="formFooter">
      <a className="underlineHover" href="#">Forgot Password?</a>
    </div>

  </div>
</div>
        );
    }

}

export default Login;