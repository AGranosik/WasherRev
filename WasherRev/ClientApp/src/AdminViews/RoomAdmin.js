import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { room_delete, room_getall, room_insert, room_update } from '../actions/RoomActions'
import { room_extract } from '../components/common/ModelExtractionFromForm';
import { buildingOption } from '../components/common/EditDropDowns';
import CustomDropDownListModalBody from '../components/common/CustomDropDownListModalBody';
import { streetNumberValidator } from '../components/common/Validators';

class RoomAdmin extends React.Component{

    componentDidMount(){
        this.props.room_getall(
            this.props.user.token
        );
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
        // for(let i = 0; i < row.length; i++){
        //   var producer = this.props.producers.find(
        //     (producer) => {
        //       return producer.name === row[i]
        //     }
        //   );
        //   this.props.producer_delete(
        //     this.props.user.token,
        //     producer.id
        //   )
        // }
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

    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)" 
          };

          const options = {
            afterInsertRow: this.onAfterInsertRow,
            // afterDeleteRow: this.onAfterDeleteRow,
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
            options={options}>
            <TableHeaderColumn isKey autoValue hiddenOnInsert hidden dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Nazwa pokoju</TableHeaderColumn>
            <TableHeaderColumn dataField='floor' editable={ { validator: streetNumberValidator } } >Piętro</TableHeaderColumn>
            <TableHeaderColumn dataField='capacity' editable={ { validator: streetNumberValidator } } >Pojemność</TableHeaderColumn>
            <TableHeaderColumn dataField='buildingName' customInsertEditor={ { getElement: this.buildingField } }>Budynek</TableHeaderColumn>
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