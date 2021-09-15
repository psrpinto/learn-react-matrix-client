import './App.css';
import React from "react";
import * as sdk from "matrix-js-sdk";
import RoomList from "./RoomList";
import Timeline from "./Timeline";
import Composer from "./Composer";
import {MatrixClient, Room} from "matrix-js-sdk";

enum Status {
    Loading = "loading",
    Loaded = "loaded",
    Failed = "Failed",
}

interface State {
    status: Status;
    selectedRoom: Room|null;
}

class App extends React.Component<{}, State> {
    client: MatrixClient;

    constructor(props: {}) {
        super(props);
        this.client = sdk.createClient({
            baseUrl: 'http://localhost:8008',
            userId: '@admin:matrix.test',
            accessToken: 'syt_YWRtaW4_WgzGYbdhFRZdOJTGxUzx_0NPo3T',
        });
        this.state = {
            status: Status.Loading,
            selectedRoom: null,
        };
    }

    render() {
        if (this.state.status === Status.Loaded) {
            return (
                <div className="App">
                    <RoomList client={this.client}
                              onSelectionChange={(newlySelectedRoom: Room) => this.setState({selectedRoom: newlySelectedRoom})}/>
                    {this.state.selectedRoom &&
                        <div className="rightSide">
                            <Composer client={this.client}
                                      room={this.state.selectedRoom}/>
                            <Timeline client={this.client}
                                      room={this.state.selectedRoom}/>
                        </div>
                    }
                </div>
            );
        }

        if (this.state.status === Status.Loading) {
            return (
                <div className="LoadingScreen">
                    Loading....
                </div>
            );
        }

        return (
            <div className="ErrorScreen">
                Failed to load
            </div>
        );
    }

    componentDidMount() {
        this.client.once('sync', status => {
            if (status !== 'PREPARED') {
                this.setState({status: Status.Failed});
                return;
            }

            this.setState({status: Status.Loaded});
        });

        this.client.startClient({}).catch(error => {
            this.setState({status: Status.Failed});
            console.log('Initial sync failed: ' + error);
        });
    }

    componentWillUnmount() {
        this.client.stopClient();
    }
}

export default App;
