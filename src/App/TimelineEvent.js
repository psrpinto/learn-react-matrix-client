import React from "react";

class TimelineEvent extends React.Component {
    constructor(props) {
        super(props);

        let event = this.props.event;
        let timestamp = new Date(event.origin_server_ts);

        this.state = {
            body: event.content.body,
            sender: event.sender,
            timestamp: `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`,
        };
    }
    render() {
        return (
            <div className="timelineEvent">
                <span className="timestamp">{this.state.timestamp}</span>&nbsp;
                <span className="sender">{this.state.sender}</span>:&nbsp;
                <span>{this.state.body}</span>
            </div>
        );
    }
}

export default TimelineEvent;
