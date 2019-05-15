import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ReservationAdmin extends React.Component {
    render(){
        return(
            <div>cos</div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        reservations: state.producers
    }
}

export default connect(mapStateToProps)(ReservationAdmin);