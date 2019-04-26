import React from "react";
import HomeAdmin from '../AdminViews/HomeAdmin';
import { connect } from 'react-redux';


class Home extends React.Component{

    properView = () => {
        if(this.props.isAdmin){
            return <HomeAdmin />
        }
    }


    render(){
        return (
            this.properView()
        );
    }

} 



const mapStateToProps = (state) => {
    const user = state.user;
    var isAdmin = false;
    if(user){
        isAdmin = ( user.role === 'Admin' ) ? true : false;
    }
    return { isAdmin: isAdmin }
};

export default connect(mapStateToProps)(Home);