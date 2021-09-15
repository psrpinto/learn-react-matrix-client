import React from "react";
import TimelineEvent from "./TimelineEvent";
import {IEvent, MatrixClient, MatrixEvent, Room} from "matrix-js-sdk";

interface Props {
    client: MatrixClient;
    room: Room;
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

        this.handleTimelineEvent = this.handleTimelineEvent.bind(this);
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
        let events = this.props.room.timeline.map((timelineEvent) => {
            return timelineEvent.getEffectiveEvent();
        });

        let messages = events.filter(event => {
            return event.type === 'm.room.message' && event.content && event.content.body;
        });

        this.setState({messages});
    }

    handleTimelineEvent(event: MatrixEvent, room: Room) {
        if (this.props.room.roomId === room.roomId) {
            this.parseTimeline();
        }
    }

    componentDidUpdate(previousProps: Props) {
        if (previousProps.room && this.props.room.roomId === previousProps.room.roomId) {
            return;
        }

        this.parseTimeline();
    }

    componentDidMount() {
        this.client.on('Room.timeline', this.handleTimelineEvent);
        this.parseTimeline();
    }

    componentWillUnmount() {
        this.client.off('Room.timeline', this.handleTimelineEvent);
    }
}

export default Timeline;
