import React from "react";
import TimelineEvent from "./TimelineEvent";

class Timeline extends React.Component {
    constructor(props) {
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

    parseTimeline() {
        let events = this.props.room.timeline.map(timelineEntry => {
            return timelineEntry.event;
        });

        let messages = events.filter(event => {
            return event.type === 'm.room.message' && event.content.body;
        });

        this.setState({messages});
    }

    componentDidUpdate(previousProps) {
        if (!this.props.room) {
            return;
        }

        if (previousProps.room && this.props.room.roomId === previousProps.room.roomId) {
            return;
        }

        this.parseTimeline();

        this.client.on("Room.timeline", (event, room, toStartOfTimeline) => {
            if (this.props.room.roomId !== room.roomId) {
                return;
            }

            this.parseTimeline();
        });
    }
}

export default Timeline;
