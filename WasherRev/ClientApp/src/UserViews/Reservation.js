import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { reservation_reserve } from '../actions/ReservationActions';
import apiProvider from '../api/apiProvider';

class Reservation extends React.Component{

    componentDidMount(){
        this.getReservations();
    }

    getReservations = async () =>{
        var date = new Date();
        var response = await apiProvider(this.props.user.token).get(`/api/Reservation/GetReservationsForUser/${this.props.user.buildingId}/${date.getFullYear()}/${date.getMonth() +1}`);
        var reservations = response.data;

        this.setState({
            reservations: reservations
        });
    }

    state = {
        reservations: []
    }

    buttonFromat(cell, row){
        var date = new Date(row.startTime.replace(' ', 'T'));
        var now = new Date();
        if(date.getFullYear() === now.getFullYear()
            && date.getMonth() >= now.getMonth()
            && date.getDate() >= now.getDate()){
                
                if(date.getDate() === now.getDate()){
                    if(date.getHours() >= now.getHours()){
                        
                        return (
                            <Button 
                              variant="primary"
                              lg="sm"
                              onClick={() =>{
                                this.props.reservation_reserve(
                                    this.props.user.token,
                                    row.id,
                                    this.props.user.userId
                                );

                                var revArray = this.state.reservations.filter((rev) => {
                                    if(rev.id !== row.id) return rev;
                                });
                                this.setState({
                                    reservations: revArray
                                });
                                alert('Rezerwacja przebiegła pomyślnie');
                              }
                              }>Zarezerwuj</Button>
                          );
                    }
                    else{
                        return 'Nie można już dokonać rezerwacji';
                    }
                }
                else{
                    return (
                        <Button 
                          variant="primary"
                          lg="sm"
                          onClick={() =>{
                            this.props.reservation_reserve(
                              this.props.user.token,
                              row.id,
                              this.props.user.userId
                            );

                            var revArray = this.state.reservations.filter((rev) => {
                                if(rev.id !== row.id) return rev;
                            });
                            this.setState({
                                reservations: revArray
                            });
                            alert('Rezerwacja przebiegła pomyślnie');
                          }
                          }>Zarezerwuj</Button>
                      );
                }
            }
            else{
                return '';
            }
          
      }

      getData(){
        return this.state.reservations.map(
            (reservation) => {
              if(reservation.users){
                  return {
                    ...reservation,
                    endTime: reservation.endTime.replace('T', ' '),
                    startTime: reservation.startTime.replace('T', ' '),
                    username: reservation.users.username,
                    washerName: reservation.washer.name
                  }
              }

              return {
                ...reservation,
                endTime: reservation.endTime.replace('T', ' '),
                startTime: reservation.startTime.replace('T', ' '),
                username: 'brak',
                washerName: reservation.washer.name
              }
            }
        )
    }

    render(){
        return (
            <BootstrapTable
            data={this.getData()}
            striped
            hover
            condensed
            search>
            <TableHeaderColumn isKey hidden hiddenOnInsert autoValue dataField='id'></TableHeaderColumn>
            <TableHeaderColumn dataField='username' >Użytkownik</TableHeaderColumn>
            <TableHeaderColumn dataField='startTime' >Rozpoczęcie</TableHeaderColumn>
            <TableHeaderColumn dataField='endTime' >Zakończenie</TableHeaderColumn>
            <TableHeaderColumn dataField='washerName' >Pralka</TableHeaderColumn>
            <TableHeaderColumn dataFormat={ (cell, row) => this.buttonFromat(cell, row) }></TableHeaderColumn>
        </BootstrapTable>
        );
    }

} 



const mapStateToProps = (state) => {
    return { 
        user: state.user 
    }
};

export default connect(mapStateToProps, { reservation_reserve })(Reservation);