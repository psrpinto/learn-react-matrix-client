import React from "react";

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.client = props.client;

        this.state = {
            rooms: [],
            selectedRoomId: ''
        };
    }

    render() {
        return (
            <ul className="roomList">
                {this.state.rooms.map(room => (
                    <li key={room.roomId}
                        className={this.state.selectedRoomId === room.roomId ? 'selected' : ''}
                        onClick={() => this.selectRoom(room)}>
                        <span>{room.name}</span>
                    </li>
                ))}
            </ul>
        );
    }

    selectRoom(room) {
        this.setState({selectedRoomId: room.roomId})
        this.props.onSelectionChange(room);
    }

    componentDidMount() {
        this.client.getJoinedRooms()
            .then(data => {
                if (!data['joined_rooms'] || data['joined_rooms'].length === 0) {
                    return;
                }

                const rooms = data['joined_rooms'].map(roomId => {
                    return this.client.getRoom(roomId);
                });

                this.setState({rooms});

                let firstRoom = rooms.find(() => true);
                this.selectRoom(firstRoom);
            })
            .catch(error => {
                console.log('Failed to fetch joined rooms: ' + error)
            });
    }
}

export default RoomList;
