import React from "react";

interface Props {

}

interface State {

}

class Composer extends React.Component<Props, State> {
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
