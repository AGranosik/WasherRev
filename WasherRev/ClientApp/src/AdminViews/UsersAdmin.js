import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  users_getFullInfo,
  users_delete } from '../actions/UsersActions';

class UsersAdmin extends React.Component{

    componentDidMount(){
      this.props.users_getFullInfo(this.props.user.token);
    }

      onAfterDeleteRow = (row) => {
        for(let i = 0; i < row.length; i++){
          console.log(row[i]);
          this.props.users_delete(
            this.props.user.token,
              row[i]
          )
        }

      }

      customNameField = (column, attr, editorClass, ignoreEditable) => {
        return null;
      }

    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)" 
          };

          const options = {
            afterInsertRow: this.onAfterInsertRow,
            afterDeleteRow: this.onAfterDeleteRow

          };



        return (
        <BootstrapTable
            data={this.props.users}
            striped
            hover
            condensed
            selectRow={selectRowProp}
            deleteRow
            insertRow
            search
            options={options}>
            <TableHeaderColumn isKey editable={false} customInsertEditor={ { getElement: this.customNameField } } dataField='id'>ID</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='username'>Nazwa użytkownika</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingId'>Budynek</TableHeaderColumn>
            <TableHeaderColumn dataField='roleName'>Rola</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='password'>Hasło</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

// add buildingName later

const mapStateToProps = (state) => {
  console.log(state);
    return {
        user: state.user,
        users: state.users    
    }
}

export default connect(mapStateToProps, { users_getFullInfo, users_delete })(UsersAdmin);