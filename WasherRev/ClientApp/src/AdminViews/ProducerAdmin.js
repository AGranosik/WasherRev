import React from 'react';
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { producer_delete, producer_getall, producer_insert, producer_update } from '../actions/ProducerActions'
import { producer_extract } from '../components/common/ModelExtractionFromForm';
import { phoneNumberValidator } from '../components/common/Validators';

class ProducerAdmin extends React.Component{

    componentDidMount(){
        this.props.producer_getall(
            this.props.user.token
        );
    }

    onAfterInsertRow = (row) => {
        this.props.producer_insert(
            this.props.user.token,
            producer_extract(row)
        );
    }

    onAfterDeleteRow = (row) => {
        for(let i = 0; i < row.length; i++){
          var producer = this.props.producers.find(
            (producer) => {
              return producer.name === row[i]
            }
          );
          this.props.producer_delete(
            this.props.user.token,
            producer.id
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
            deleteText: "Usuń dane producenta",
            insertText: 'Dodaj dane producenta'
          };

        return (
        <BootstrapTable
            data={this.props.producers}
            striped
            hover
            condensed
            selectRow={selectRowProp}
            deleteRow
            insertRow
            search
            options={options}>
            <TableHeaderColumn isKey dataField='name'>Nazwa budynku </TableHeaderColumn>
            <TableHeaderColumn editable={ { validator: phoneNumberValidator } }  dataField='servicePhoneNo' >Numer telefonu</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        producers: state.producers
    }
}

export default connect(mapStateToProps, { producer_delete, producer_getall, producer_insert, producer_update })(ProducerAdmin);