import React from "react";

class RoomList extends React.Component {
    render() {
        return (
            <div className="roomList">
                <ul style={{listStyle: 'none'}}>
                    {this.props.rooms.map(room => (
                        <li key={room.name}>
                            <span>{room.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default RoomList;
