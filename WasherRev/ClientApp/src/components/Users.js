import React from 'react';
import UsersAdmin from '../AdminViews/UsersAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
class Users extends React.Component{

    componentDidMount() {
    }

    render() {
        return(
            <UsersAdmin />
        );
    }
}

export default Users;