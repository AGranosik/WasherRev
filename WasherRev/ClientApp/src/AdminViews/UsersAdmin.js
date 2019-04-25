import React from 'react';
import { connect } from "react-redux";
import { Table } from 'react-bootstrap';

class UsersAdmin extends React.Component{

    renderTableContent = async () => {
        if(!this.props.users)
            return <div>Loading...</div>

        console.log(this.props);
    }

    componentDidMount(){
        this.renderTableContent();
    }

    render(){
        return(
            <div>Users</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users    
    }
}

export default connect(mapStateToProps)(UsersAdmin);