import React from 'react';
import { connect } from 'react-redux';


class Home extends React.Component{

    properView = () => {
        if(!this.props.isAdmin){
            return (
                <div>Witaj na stronie umożliwiającej rezerwacje pralki</div>
            )
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
        isAdmin = ( user.roleName === "Admin" ) ? true : false;
    }
    return { isAdmin: isAdmin }
};

export default connect(mapStateToProps)(Home);