import React from "react";
import TimelineEvent from "./TimelineEvent";
import {IEvent, MatrixClient, Room} from "matrix-js-sdk";

interface Props {
    client: MatrixClient;
    room: Room|null;
}

interface State {
    messages: IEvent[];
}

class Timeline extends React.Component<Props, State> {
    client: MatrixClient;

    constructor(props: Props) {
        super(props);

        this.client = props.client;

        this.state = {
            messages: [],
        }
    }

    render() {
        return (
            <ul className="timeline">
                {this.state.messages.map(event => (
                    <li key={event.event_id}>
                        <TimelineEvent event={event}/>
                    </li>
                ))}
            </ul>
        );
    }

    private parseTimeline() {
        if (!this.props.room) {
            return;
        }

        let events = this.props.room.timeline.map((timelineEvent) => {
            return timelineEvent.getEffectiveEvent();
        });

        let messages = events.filter(event => {
            return event.type === 'm.room.message' && event.content && event.content.body;
        });

        this.setState({messages});
    }

    componentDidUpdate(previousProps: Props) {
        if (!this.props.room) {
            return;
        }

        if (previousProps.room && this.props.room.roomId === previousProps.room.roomId) {
            return;
        }

        this.parseTimeline();

        this.client.on("Room.timeline", (event, room, toStartOfTimeline) => {
            if (!this.props.room || (this.props.room.roomId !== room.roomId)) {
                return;
            }

            this.parseTimeline();
        });
    }
}

export default Timeline;
