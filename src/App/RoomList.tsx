import React from "react";
import {MatrixClient, Room} from "matrix-js-sdk";

interface Props {
    client: MatrixClient;
    onSelectionChange: (room: Room) => void;
}

interface State {
    rooms: Room[];
    selectedRoomId: string;
}

class RoomList extends React.Component<Props, State> {
    client: MatrixClient;

    constructor(props: Props) {
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

    selectRoom(room: Room|undefined) {
        if (room) {
            this.setState({selectedRoomId: room.roomId})
            this.props.onSelectionChange(room);
        }
    }

    componentDidMount() {
        this.client.getJoinedRooms()
            .then(response => {
                const rooms = response.joined_rooms.map((roomId: string): Room => {
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
