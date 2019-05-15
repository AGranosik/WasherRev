import React from 'react';
import ReservationAdmin from '../AdminViews/ReservationAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Reservation extends React.Component{
    render() {
        return(
            <ReservationAdmin />
        );
    }
}

export default Reservation;