import './App.css';
import React from "react";
import RoomList from "./RoomList";
import * as sdk from "matrix-js-sdk";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.matrixClient = sdk.createClient({
            baseUrl: 'http://localhost:8008',
            userId: '@admin:matrix.test',
            accessToken: 'syt_YWRtaW4_WgzGYbdhFRZdOJTGxUzx_0NPo3T',
        });
        this.state = {
            status: 'loading',
            rooms: [],
        };
    }

    componentDidMount() {
        this.matrixClient.startClient({}).catch(error => {
            this.setState({status: 'failed'});
            console.log('Initial sync failed: ' + error);
        });

        this.matrixClient.once('sync', state => {
            if (state !== 'PREPARED') {
                this.setState({status: 'failed'});
                return;
            }

            this.setState({status: 'loaded'});

            this.matrixClient.getJoinedRooms().then(data => {
                const rooms = data['joined_rooms'].map(joinedRoomId => {
                    return this.matrixClient.getRoom(joinedRoomId);
                });
                this.setState({rooms: rooms});
            }).catch(error => console.log('Failed to fetch joined rooms: ' + error));
        });
    }

    render() {
        if (this.state.status === 'loading') {
            return (
                <div className="LoadingScreen">
                    Loading....
                </div>
            );
        }

        if (this.state.status === 'failed') {
            return (
                <div className="ErrorScreen">
                    Failed to load
                </div>
            );
        }

        return (
            <div className="App">
                <RoomList rooms={this.state.rooms}/>
            </div>
        );
    }
}

export default App;
