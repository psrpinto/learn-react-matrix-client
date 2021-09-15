import React from "react";
import {MatrixClient, Room} from "matrix-js-sdk";

interface Props {
    client: MatrixClient;
    room: Room;
}

interface State {

}

class Composer extends React.Component<Props, State> {
    client: MatrixClient;

    constructor(props: Props) {
        super(props);
        this.client = this.props.client;
        this.state = {};
    }

    render() {
        return (
            <div className="composer">
                <textarea />
                <button>Send</button>
            </div>
        );
    }
}

export default Composer;
