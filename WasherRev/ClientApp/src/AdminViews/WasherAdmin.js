import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { washer_delete, washer_getall, washer_insert, washer_update } from '../actions/WasherActions';
import { washer_extract } from '../components/common/ModelExtractionFromForm';

class WasherAdmin extends React.Component{


    componentDidMount(){
        this.props.washer_getall(
            this.props.user.token
        );
    }

    getData(){
        return this.props.washers.map(
            (washer) => {
                return{
                    ...washer,
                    roomName: washer.room.name,
                    producerName: washer.producer.name,
                    sinceWhen: washer.sinceWhen.replace('T', ' '),
                    workedTo: washer.workedTo == null ? '' : washer.workedTo.replace('T', ' ')
                }

            }
        )
    }
    onAfterInsertRow = (row) => {
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
            <TableHeaderColumn isKey hidden hiddenOnInsert dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Nazwa</TableHeaderColumn>
            <TableHeaderColumn dataField='roomName' >Nazwa pokoju</TableHeaderColumn>
            <TableHeaderColumn dataField='producerName'>Producent</TableHeaderColumn>
            <TableHeaderColumn dataField='sinceWhen'>Od kiedy</TableHeaderColumn>
            <TableHeaderColumn dataField='workedTo'>Pracuje do</TableHeaderColumn>


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