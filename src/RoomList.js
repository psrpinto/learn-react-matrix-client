import React from "react";

class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoomName: ''
        };
    }

    selectRoom(room) {
        if (!room) {
            return;
        }

        this.setState({selectedRoomName: room.name})
        this.props.onSelectionChange(room);
    }

    render() {
        if (!this.state.selectedRoomName) {
            let firstRoom = this.props.rooms ? this.props.rooms.find(() => true) : false;
            this.selectRoom(firstRoom);
        }

        return (
            <div className="roomList">
                <ul style={{listStyle: 'none'}}>
                    {this.props.rooms.map(room => (
                        <li key={room.name}
                            className={this.state.selectedRoomName === room.name ? 'selected' : ''}
                            onClick={() => this.selectRoom(room)}>
                            <span>{room.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default RoomList;
