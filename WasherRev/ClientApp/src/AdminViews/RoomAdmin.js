import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { room_delete, room_getall, room_insert, room_update } from '../actions/RoomActions'
import { room_extract } from '../components/common/ModelExtractionFromForm';
import { buildingOption } from '../components/common/EditDropDowns';
import CustomDropDownListModalBody from '../components/common/CustomDropDownListModalBody';
import { streetNumberValidator } from '../components/common/Validators';
import apiProvider from '../api/apiProvider';

class RoomAdmin extends React.Component{

    componentDidMount(){
        this.props.room_getall(
            this.props.user.token
        );
        this.getBuildings();
    }

    state = {
        buildings: []
    }

    buildingFullInfo = (building) => {
        return `Nr ${building.id} : (${building.name} ${building.street} ${building.streetNo} ${building.postCode})`;
      }

    onAfterInsertRow = (row) => {
        this.props.room_insert(
            this.props.user.token,
            room_extract(row)
        );
    }

    onAfterDeleteRow = (row) => {
        console.log(row);
        for(let i = 0; i < row.length; i++){
          var room = this.props.rooms.find(
            (room) => {
              return room.id === row[i]
            }
          );
          this.props.room_delete(
            this.props.user.token,
            room.id
          )
        }
    }

    getData = () => {
       return this.props.rooms.map(
            (room) => {
                return{
                    ...room,
                    buildingName: this.buildingFullInfo(room.building)
                }
            }
        );
    }

    buildingField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropDownListModalBody
            url='/api/Building'
            token={ this.props.user.token }
            ref={ attr.ref }
            dropdownOption={buildingOption}
            placeholder="Wybierz budenek przypisany do użytkownika" />
        );
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
            return this.buildingFullInfo(building);
          }
        );
      }

      onAfterEditRow = (row) => {
        this.props.room_update(
          this.props.user.token,
          room_extract(row, true)
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
            afterDeleteRow: this.onAfterDeleteRow,
            deleteText: "Usuń pokój",
            insertText: 'Dodaj pokój'
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
            <TableHeaderColumn isKey autoValue hiddenOnInsert hidden dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Nazwa pokoju</TableHeaderColumn>
            <TableHeaderColumn dataField='floor' editable={ { validator: streetNumberValidator } } >Piętro</TableHeaderColumn>
            <TableHeaderColumn dataField='capacity' editable={ { validator: streetNumberValidator } } >Pojemność</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingName' editable={ { type: 'select', options: { values: this.getBuildingsValues() } } } customInsertEditor={ { getElement: this.buildingField } }>Budynek</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        rooms: state.rooms
    }
}

export default connect(mapStateToProps, { room_delete, room_getall, room_insert, room_update })(RoomAdmin);