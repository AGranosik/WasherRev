import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { building_getAll } from '../actions/BuildingActions';


class BuildingAdmin extends React.Component{

    componentDidMount(){
        this.props.building_getAll(
            this.props.user.token
        );
    }

    render(){
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)" 
          };

        return (
        <BootstrapTable
            data={this.props.buildings}
            striped
            hover
            condensed
            selectRow={selectRowProp}
            deleteRow
            insertRow
            search>
            <TableHeaderColumn isKey dataField='name'>Nazwa budynku </TableHeaderColumn>
            <TableHeaderColumn dataField='street' >Ulica</TableHeaderColumn>
            <TableHeaderColumn dataField='streetNo' >Nr ulicy</TableHeaderColumn>
            <TableHeaderColumn dataField='postCode'>Kod pocztowy</TableHeaderColumn>
        </BootstrapTable>
        );
    }


}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        buildings: state.buildings
    }
}

export default connect(mapStateToProps, { building_getAll })(BuildingAdmin);
