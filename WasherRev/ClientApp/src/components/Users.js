import React from 'react';
import UsersAdmin from '../AdminViews/UsersAdmin';

class Users extends React.Component{

    componentDidMount() {
        console.log('mount');
    }

    render() {
        console.log('here');
        return(
            <UsersAdmin />
        );
    }
}

export default Users;