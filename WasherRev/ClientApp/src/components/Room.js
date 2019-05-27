import React from 'react';
import RoomAdmin from '../AdminViews/RoomAdmin';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
class Room extends React.Component{
    render() {
        return(
            <RoomAdmin />
        );
    }
}

export default Room;