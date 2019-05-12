import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 
{
  users_getFullInfo,
  users_delete,
  users_insert
} from '../actions/UsersActions';
import apiProvider from '../api/apiProvider';
import CustomDropDownListModalBody from '../components/common/CustomDropDownListModalBody'
  import 'react-dropdown/style.css'


class UsersAdmin extends React.Component{

  state = {
    buildings: []
  }

    componentDidMount(){
      this.props.users_getFullInfo(this.props.user.token);
      this.getBuildings();
      console.log(this.props);
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
        var user = {
          Email: row.email,
          BuildingId: row.buildingName.split(" ")[1],
          Password: row.password,
          RoleName: row.roleName,
          Username: row.username,
          IsActive: 1
        }

        console.log(user);
        this.props.users_insert(
          this.props.user.token,
          user
        )
      }

      onAfterEditRow = (row) => {
        console.log(row);
      }

      buildingField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropDownListModalBody
            url='/api/Building'
            token={ this.props.user.token }
            ref={ attr.ref }
            dropdownOption={this.buildingOption}
            placeholder="Wybierz budenek przypisany do użytkownika" />
        );
      }

      roleField = (column, attr, editorClass, ignoreEditable) => {
        return(
          <CustomDropDownListModalBody
            url='api/Role'
            token={ this.props.user.toke }
            ref={ attr.ref }
            dropdownOption={ this.roleOption }
            placeholder="Wybierz rolę"/>
        )
      }

      roleOption = (role) => {
        return {
          value: role.id,
          label: role.name
        }
      }

      buildingOption = (building) => {
        return {
          value: building.id,
          label: `Nr ${building.id} : ${building.name} ${building.street} ${building.streetNo} ${building.postCode}`
        }
      }

      getBuildings = async () => {
        var response = await apiProvider(this.props.user.token).get('/api/Building');
        var buildings = response.data;
        this.setState({
          buildings: buildings
        });
      }

      getBuildingsValues = () => {
        return this.state.buildings.map(
          (building) => {
            return `${building.id} (${building.name} ${building.street} ${building.streetNo} ${building.postCode})`;
          }
        );
      }

      getData = () => {
        return this.props.users.map(
          (user) => {
            console.log(user);
            return {...user, buildingName: `Nr ${user.building.id} : ${user.building.name} ${user.building.street} ${user.building.streetNo} ${user.building.postCode}`}
          }
        )
      }

      emailValidator = (value, row) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(value).toLowerCase()))
          return 'Podano niepoprawny email!';

        return true;
      }

    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)" 
          };

          const options = {
            afterInsertRow: this.onAfterInsertRow,
            afterDeleteRow: this.onAfterDeleteRow,
          };

        return (
        <BootstrapTable
            data={this.getData()}
            striped
            hover
            condensed
            selectRow={selectRowProp}
            deleteRow
            insertRow
            search
            cellEdit = {
              {
                 mode: 'dbclick',
                 blurToSave: true,
                 afterSaveCell: this.onAfterEditRow
              }
            }
            options={options}>
            <TableHeaderColumn isKey dataField='username'>Nazwa użytkownika</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingName' editable={ { type: 'select', options: { values: this.getBuildingsValues() } } } customInsertEditor={ { getElement: this.buildingField } }>Budynek</TableHeaderColumn>
            <TableHeaderColumn dataField='roleName' customInsertEditor={ { getElement: this.roleField } }>Rola</TableHeaderColumn>
            <TableHeaderColumn dataField='email' editable={ { validator: this.emailValidator } }>Email</TableHeaderColumn>
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

export default connect(mapStateToProps, { users_getFullInfo, users_delete, users_insert })(UsersAdmin);