import React from 'react';
import WasherAdmin from '../AdminViews/WasherAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Washer extends React.Component{
    render() {
        return(
            <WasherAdmin />
        );
    }
}

export default Washer;