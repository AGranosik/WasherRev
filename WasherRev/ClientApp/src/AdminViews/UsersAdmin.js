import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  users_getFullInfo,
  users_delete } from '../actions/UsersActions';
  import apiProvider from '../api/apiProvider';
  import Dropdown from 'react-dropdown'
  import 'react-dropdown/style.css'

  class CustomDropdownInsert extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        selectedValue: 0,
        buildings: []
      };
    }

    async componentDidMount(){
      var response = await apiProvider(this.props.token).get('/api/Building');
      this.setState({
        buildings: response.data
      });
    }

    getFieldValue = () => {
      return this.state.selectedValue;
    }

    getOptions = () => {
      const { buildings } = this.state;
      if(buildings){
        return buildings.map((element) => {
          return {
            value: element.id,
            label: `${element.name}(${element.street} ${element.streetNo} ${element.postCode})`
          }
        })
      }
    }

    onChange = (e) => {
      console.log(e);
      this.setState({
        selectedValue: e.value}
        );
    }
  
    render() {
      return (
      <Dropdown
          options={this.getOptions()}
          placeholder="Wybierz budynek przypisania do użytkownika"
          onChange={this.onChange}
         />
      );
    }
  }


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

      customSaleField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropdownInsert token={ this.props.user.token } ref={ attr.ref } />
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
            <TableHeaderColumn dataField='buildingId' customInsertEditor={ { getElement: this.customSaleField } }>Budynek</TableHeaderColumn>
            <TableHeaderColumn dataField='roleName'>Rola</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='password'>Hasło</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

// add buildingName later

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users    
    }
}

export default connect(mapStateToProps, { users_getFullInfo, users_delete })(UsersAdmin);