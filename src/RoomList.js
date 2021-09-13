import React from "react";

class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoomName: ''
        };
    }

    componentDidMount() {
        let firstRoom = this.props.rooms ? this.props.rooms.find(() => true) : false;
        this.selectRoom(firstRoom);
    }

    selectRoom(room) {
        if (!room) {
            return;
        }

        this.setState({selectedRoomName: room.name})
        this.props.onSelectionChange(room);
    }

    render() {
        return (
            <ul className="roomList">
                {this.props.rooms.map(room => (
                    <li key={room.name}
                        className={this.state.selectedRoomName === room.name ? 'selected' : ''}
                        onClick={() => this.selectRoom(room)}>
                        <span>{room.name}</span>
                    </li>
                ))}
            </ul>
        );
    }
}

export default RoomList;
