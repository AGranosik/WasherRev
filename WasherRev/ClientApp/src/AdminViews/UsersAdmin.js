import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 
{
  users_getFullInfo,
  users_delete
} from '../actions/UsersActions';
import CustomDropDownListModalBody from '../components/common/CustomDropDownListModalBody'
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

      buildingField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropDownListModalBody
            url='/api/Building'
            token={ this.props.user.token }
            ref={ attr.ref }
            dropdownOption={this.buildingOption} />
        );
      }

      roleField = (column, attr, editorClass, ignoreEditable) => {
        return(
          <CustomDropDownListModalBody
            url='api/Role'
            token={ this.props.user.toke }
            ref={ attr.ref }
            dropdownOption={ this.roleOption } />
        )
      }

      buildingOption = (building) => {
        return {
          value: building.id,
          label: `${building.id} (${building.name} ${building.street} ${building.streetNo} ${building.postCode})`
        }
      }

      roleOption = (role) => {
        return {
          value: role.id,
          label: role.name
        }
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
            <TableHeaderColumn isKey hiddenOnInsert autoValue dataField='id'>ID</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='username'>Nazwa użytkownika</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingId' customInsertEditor={ { getElement: this.buildingField } }>Budynek</TableHeaderColumn>
            <TableHeaderColumn dataField='roleId' customInsertEditor={ { getElement: this.roleField } }>Rola</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='password'>Hasło</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users    
    }
}

export default connect(mapStateToProps, { users_getFullInfo, users_delete })(UsersAdmin);