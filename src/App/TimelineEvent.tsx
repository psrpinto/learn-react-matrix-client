import React from "react"
import {IEvent} from "matrix-js-sdk"

interface Props {
    event: IEvent
}

interface State {
    body: string
    sender: string
    timestamp: string
}

class TimelineEvent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        let event = this.props.event
        let timestamp = new Date(event.origin_server_ts)

        this.state = {
            body: event.content.body,
            sender: event.sender,
            timestamp: `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`,
        }
    }
    render() {
        return (
            <div className="timelineEvent">
                <span className="timestamp">{this.state.timestamp}</span>&nbsp
                <span className="sender">{this.state.sender}</span>:&nbsp
                <span>{this.state.body}</span>
            </div>
        )
    }
}

export default TimelineEvent
