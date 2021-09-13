import React from "react";
import TimelineEvent from "./TimelineEvent";

class Timeline extends React.Component {
    render() {
        if (!this.props.room) {
            return null;
        }

        let events = this.props.room.timeline.map(timelineEntry => {
            return timelineEntry.event;
        });

        let messages = events.filter(event => {
            return event.type === 'm.room.message' && event.content.body;
        });

        return (
            <ul className="timeline">
                {messages.map(event => (
                    <li key={event.event_id}>
                        <TimelineEvent event={event}/>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Timeline;
