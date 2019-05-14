import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { building_getAll, building_delete, building_insert, building_update } from '../actions/BuildingActions';
import { streetNumberValidator, postCodeValidator } from '../components/common/Validators';
import { building_extract } from '../components/common/ModelExtractionFromForm';


class BuildingAdmin extends React.Component{

    componentDidMount(){
        this.props.building_getAll(
            this.props.user.token
        );
    }

    onAfterDeleteRow = (row) => {
        for(let i = 0; i < row.length; i++){
          var building = this.props.buildings.find(
            (building) => {
              return building.name === row[i]
            }
          );
          this.props.building_delete(
            this.props.user.token,
            building.id
          )
        }
    }

      onAfterInsertRow = (row) => {
        this.props.building_insert(
          this.props.user.token,
          building_extract(row)
        );
      }

      onAfterEditRow = (row) => {
          this.props.building_update(
              this.props.user.token,
              building_extract(row, true)
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
            search
            cellEdit = {
                {
                   mode: 'dbclick',
                   blurToSave: true,
                   afterSaveCell: this.onAfterEditRow
                }
              }
            options={options}>
            <TableHeaderColumn isKey dataField='name'>Nazwa budynku </TableHeaderColumn>
            <TableHeaderColumn dataField='street' >Ulica</TableHeaderColumn>
            <TableHeaderColumn editable={ { validator: streetNumberValidator } }dataField='streetNo' >Nr ulicy</TableHeaderColumn>
            <TableHeaderColumn editable={ { validator: postCodeValidator } } dataField='postCode'>Kod pocztowy</TableHeaderColumn>
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

export default connect(mapStateToProps, { building_getAll, building_delete, building_insert, building_update })(BuildingAdmin);
