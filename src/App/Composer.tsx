import React, {ChangeEvent} from "react";
import {MatrixClient, Room} from "matrix-js-sdk";

interface Props {
    client: MatrixClient;
    room: Room;
}

interface State {
    message: string;
}

class Composer extends React.Component<Props, State> {
    client: MatrixClient;

    constructor(props: Props) {
        super(props);
        this.client = this.props.client;

        this.state = {
            message: '',
        };
    }

    render() {
        return (
            <div className="composer">
                <textarea value={this.state.message} onChange={event => this.handleChange(event)}/>
                <button onClick={() => this.sendMessage()}>Send</button>
            </div>
        );
    }

    handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({message: event.target.value});
    }

    sendMessage() {
        if (this.state.message === '') {
            return;
        }

        this.client.sendTextMessage(this.props.room.roomId, this.state.message)
            .catch(error => console.log('Failed to send message: ' + error));

        this.setState({message: ''});
    }
}

export default Composer;
