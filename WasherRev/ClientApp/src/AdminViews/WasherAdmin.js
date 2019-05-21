import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { washer_delete, washer_getall, washer_insert, washer_update } from '../actions/WasherActions';
import { washer_extract } from '../components/common/ModelExtractionFromForm';
import apiProvider from '../api/apiProvider';
import CustomDropDownListModalBody from '../components/common/CustomDropDownListModalBody'
import { roomOption, producerOption } from '../components/common/EditDropDowns';


class WasherAdmin extends React.Component{

    componentDidMount(){
        this.props.washer_getall(
            this.props.user.token
        );
        this.getRooms();
    }

    state = {
        rooms: [],
        producer: []
    }

    getRooms = async () => {
        var response = await apiProvider(this.props.user.token).get('/api/Room');
        var rooms = response.data;
        this.setState({
          rooms: rooms
        });
    }

    getProducers= async () => {
      var response = await apiProvider(this.props.user.token).get('/api/Producer');
      var producers = response.data;
      this.setState({
        producers: producers
      });
    }

    getData(){
        return this.props.washers.map(
            (washer) => {
                return{
                    ...washer,
                    roomName: `Nr: ${washer.id} ${washer.room.name}`,
                    producerName: `Nr: ${washer.producer.id} ${washer.producer.name}`,
                    sinceWhen: washer.sinceWhen.split('T')[0],
                    workedTo: washer.workedTo == null ? '' : washer.workedTo.split('T')[0]
                }

            }
        )
    }

    roomField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropDownListModalBody
            url='/api/Room'
            token={ this.props.user.token }
            ref={ attr.ref }
            dropdownOption={roomOption}
            placeholder="Wybierz pokój do którego ma być przypisana pralka" />
        );
      }

      producerField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <CustomDropDownListModalBody
            url='/api/Producer'
            token={ this.props.user.token }
            ref={ attr.ref }
            dropdownOption={producerOption}
            placeholder="Wybierz producenta" />
        );
      }

    onAfterInsertRow = (row) => {
      console.log(washer_extract(row));
        this.props.washer_insert(
          this.props.user.token,
          washer_extract(row)
        );
      }

      onAfterEditRow = (row) => {
          this.props.washer_update(
              this.props.user.token,
              washer_extract(row, true)
          );
      }

      onAfterDeleteRow = (row) => {
        for(let i = 0; i < row.length; i++){
          var washer = this.props.washers.find(
            (washer) => {
              return washer.id === row[i]
            }
          );
          this.props.washer_delete(
            this.props.user.token,
            washer.id
          )
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
            afterDeleteRow: this.onAfterDeleteRow,
            insertText: 'Dodaj pralkę',
            deleteText: 'Usuń pralkę'
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
                   //afterSaveCell: this.onAfterEditRow
                }
              }
            options={options}>
            <TableHeaderColumn isKey autoValue hidden hiddenOnInsert dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Nazwa</TableHeaderColumn>
            <TableHeaderColumn dataField='roomName' customInsertEditor={ { getElement: this.roomField }}>Nazwa pokoju</TableHeaderColumn>
            <TableHeaderColumn dataField='producerName' customInsertEditor={ { getElement: this.producerField }}>Producent</TableHeaderColumn>
            <TableHeaderColumn hiddenOnInsert dataField='sinceWhen'>Od kiedy</TableHeaderColumn>
            <TableHeaderColumn hiddenOnInsert dataField='workedTo'>Pracuje do</TableHeaderColumn>


        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        washers: state.washers
    }
}

export default connect(mapStateToProps, { washer_delete, washer_insert, washer_getall, washer_update })(WasherAdmin);