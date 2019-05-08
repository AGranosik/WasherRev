import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  users_getFullInfo,
  users_delete } from '../actions/UsersActions';
  import Dropdown from 'react-dropdown'
  import 'react-dropdown/style.css'


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

      onAfterInsertRow = (row) => {
        console.log(row);
      }

      buildingDropDownList = (column, attr, editorClass, ignoreEditable) => {
        const options = [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two', className: 'myOptionClassName' },
          {
           type: 'group', name: 'group1', items: [
             { value: 'three', label: 'Three', className: 'myOptionClassName' },
             { value: 'four', label: 'Four' }
           ]
          },
          {
           type: 'group', name: 'group2', items: [
             { value: 'five', label: 'Five' },
             { value: 'six', label: 'Six' }
           ]
          }
        ]

        const defaultOption = options[0]

        return (
          <Dropdown ref={attr.ref} editorClass={editorClass} ignoreEditable={ignoreEditable} className={`${editorClass}`} {...attr} options={options} value={defaultOption} placeholder="Select an option" />
        );
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
            <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='username'>Nazwa użytkownika</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingId' customInsertEditor={ { getElement: this.buildingDropDownList } }>Budynek</TableHeaderColumn>
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