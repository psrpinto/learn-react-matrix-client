import React from "react";

class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoomName: ''
        };
    }

    setSelected(room) {
        this.setState({selectedRoomName: room.name})
    }

    render() {
        return (
            <div className="roomList">
                <ul style={{listStyle: 'none'}}>
                    {this.props.rooms.map(room => (
                        <li key={room.name}
                            className={this.state.selectedRoomName === room.name ? 'selected' : ''}
                            onClick={() => this.setSelected(room)}>
                            <span>{room.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default RoomList;
