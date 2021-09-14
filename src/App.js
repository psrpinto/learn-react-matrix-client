import './App.css';
import React from "react";
import * as sdk from "matrix-js-sdk";
import RoomList from "./RoomList";
import Timeline from "./Timeline";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.client = sdk.createClient({
            baseUrl: 'http://localhost:8008',
            userId: '@admin:matrix.test',
            accessToken: 'syt_YWRtaW4_WgzGYbdhFRZdOJTGxUzx_0NPo3T',
        });
        this.state = {
            status: 'loading',
            selectedRoom: null,
        };
    }

    render() {
        if (this.state.status === 'loaded') {
            return (
                <div className="App">
                    <RoomList client={this.client}
                              onSelectionChange={(newlySelectedRoom) => this.setState({selectedRoom: newlySelectedRoom})}/>
                    <Timeline client={this.client}
                              room={this.state.selectedRoom}/>
                </div>
            );
        }

        if (this.state.status === 'loading') {
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
        this.client.once('sync', state => {
            if (state !== 'PREPARED') {
                this.setState({status: 'failed'});
                return;
            }

            this.setState({
                status: 'loaded',
            });
        });

        this.client.startClient({}).catch(error => {
            this.setState({status: 'failed'});
            console.log('Initial sync failed: ' + error);
        });
    }
}

export default App;
