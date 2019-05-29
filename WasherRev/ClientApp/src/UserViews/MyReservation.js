import React from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { reservation_delete } from '../actions/ReservationActions';
import { Button } from 'react-bootstrap';


import apiProvider from '../api/apiProvider';
class MyReservation extends React.Component{


    state = {
        reservations: []
    }

    componentDidMount(){
        this.getUserReservations();
    }

    getUserReservations = async () => {
        var date = new Date();
        var response = await apiProvider(this.props.user.token).get(`/api/Reservation/GetUsersReservations/${this.props.user.userId}/${date.getFullYear()}/${date.getMonth() +1}`);
        console.log(response);
                
        var reservations = response.data;
        this.setState({
            reservations: reservations
        });
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
    buttonFromat(cell, row){
        var date = new Date(row.startTime.replace(' ', 'T'));
        var now = new Date();
        if(date.getFullYear() === now.getFullYear()
            && date.getMonth() >= now.getMonth()
            && date.getDay() >= now.getDay()){
                if(date.getDay() === now.getDay()){
                    if(date.getHours() > now.getHours()){
                        return (
                            <Button 
                              variant="primary"
                              lg="sm"
                              onClick={() =>{
                                this.props.reservation_delete(
                                  this.props.user.token,
                                  row.id
                                );
                                const index = this.state.reservations.findIndex(rev => rev.id === row.id);
                                this.setState({
                                    reservations: [...this.state.reservations.slice(0, index),
                                        ...this.state.reservations.slice(index+1)]
                                })
                                    
                              }
                              }>Anuluj rezerwację</Button>
                          );
                    }
                    else{
                        return 'Nie można anulować.';
                    }
                }
                return (
                    <Button 
                      variant="primary"
                      lg="sm"
                      onClick={() =>{
                        this.props.reservation_delete(
                          this.props.user.token,
                          row.id
                        );
                        const index = this.state.reservations.findIndex(rev => rev.id === row.id);
                        this.setState({
                            reservations: [...this.state.reservations.slice(0, index),
                                ...this.state.reservations.slice(index+1)]
                        })
                            
                      }
                      }>Anuluj rezerwację</Button>
                  );
            }
            else{
                return 'Nie można anulować.';
            }
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
    return{
        user: state.user
    }
};

export default connect(mapStateToProps, {reservation_delete})(MyReservation);