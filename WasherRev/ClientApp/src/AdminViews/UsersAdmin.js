import React from 'react';
import { connect } from "react-redux";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class UsersAdmin extends React.Component{

    renderTableContent = async () => {
        if(!this.props.users)
            return <div>Loading...</div>


        return (
            <BootstrapTable data={this.props.users} striped hover>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                </BootstrapTable>
            );
    }

    render(){
        return (this.renderTableContent());
        //return (
            //<div>sssss</div>
           // );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users    
    }
}

export default connect(mapStateToProps)(UsersAdmin);