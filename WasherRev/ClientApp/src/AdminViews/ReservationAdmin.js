import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { reservation_delete, reservation_getall, reservation_update } from '../actions/ReservationActions';

class ReservationAdmin extends React.Component {

    componentDidMount(){
        this.props.reservation_getall(
            this.props.user.token
        );
    }


    onAfterDeleteRow = (row) => {
        console.log(row);
        for(let i = 0; i < row.length; i++){
          var reservation = this.props.reservations.find(
            (reservation) => {
              return reservation.id === row[i]
            }
          );
          this.props.reservation_delete(
            this.props.user.token,
            reservation.id
          )
        }
    }

    getData(){
        return this.props.reservations.map(
            (reservation) => {
                return {
                    ...reservation,
                    endTime: reservation.endTime.replace('T', ' '),
                    startTime: reservation.startTime.replace('T', ' '),
                    username: reservation.users.username,
                    washerName: reservation.washer.name
                }
            }
        )
    }

    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)" 
          };

          const options = {
            afterDeleteRow: this.onAfterDeleteRow,
            deleteText: 'Usuń przypisanie użytkownika do rezerwacji',
          };

        return (
        <BootstrapTable
            data={this.getData()}
            striped
            hover
            condensed
            selectRow={selectRowProp}
            deleteRow
            search
            cellEdit = {
                {
                   mode: 'dbclick',
                   blurToSave: true,
                   afterSaveCell: this.onAfterEditRow
                }
              }
            options={options}>
            <TableHeaderColumn isKey hidden hiddenOnInsert autoValue dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='username' >Użytkownik</TableHeaderColumn>
            <TableHeaderColumn dataField='startTime' >Rozpoczęcie</TableHeaderColumn>
            <TableHeaderColumn dataField='endTime' >Zakończenie</TableHeaderColumn>
            <TableHeaderColumn dataField='washerName' >Pralka</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        reservations: state.reservations
    }
}

export default connect(mapStateToProps, { reservation_delete, reservation_getall, reservation_update })(ReservationAdmin);