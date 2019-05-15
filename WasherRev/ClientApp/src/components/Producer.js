import React from 'react';
import ProducerAdmin from '../AdminViews/ProducerAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Producer extends React.Component {
    render(){
        return(
            <ProducerAdmin/>
        );
    }
}

export default Producer;
