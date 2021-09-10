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
            isLoading: true
        };
    }

    componentDidMount() {
        this.matrixClient.startClient({}).then(() => {
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log('Initial sync failed: ' + error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="LoadingScreen">
                    Loading....
                </div>
            );
        }

        return (
            <div className="App">
                <RoomList />
            </div>
        );
    }
}

export default App;
