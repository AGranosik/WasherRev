import React from 'react';
import BuildingAdmin from '../AdminViews/BuildingAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Building extends React.Component{
    render() {
        return(
            <BuildingAdmin />
        );
    }
}

export default Building;