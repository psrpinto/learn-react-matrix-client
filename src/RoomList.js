import React from "react";

class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoomName: ''
        };
    }

    handleClick(room) {
        this.setState({selectedRoomName: room.name})
        this.props.onSelectionChange(room);
    }

    render() {
        let selectedRoomName = this.state.selectedRoomName;

        if (!selectedRoomName) {
            let firstRoom = this.props.rooms ? this.props.rooms.find(() => true) : false;
            selectedRoomName = firstRoom ? firstRoom.name : '';
        }

        return (
            <div className="roomList">
                <ul style={{listStyle: 'none'}}>
                    {this.props.rooms.map(room => (
                        <li key={room.name}
                            className={selectedRoomName === room.name ? 'selected' : ''}
                            onClick={() => this.handleClick(room)}>
                            <span>{room.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default RoomList;
