import React, { PureComponent, ReactNode } from 'react'
import Canvas from './Canvas'
import Chat from './Chat'
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { UserModel } from '../models/User';
import { GameModel } from '../models/Game';
import { IncomingMessage, OutgoingMessage } from '../models/Messages';
// import { signalR } from '@microsoft/signalr';

interface Props {}
interface State {
    hubConnection: HubConnection | null;
    user: UserModel;
    game: GameModel;
    error: Error | null;
    incomingMessages: Array<string>;
    outgoingMessage: OutgoingMessage | null;
}

class Game extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hubConnection: null,
            user: {
                Name: '',
                Image: null,
                Points: 0
            },
            game: {
                name: '',
                id: '',
                round: 1
            },
            error: null,
            incomingMessages: [],
            outgoingMessage: null
        }
    }

    componentDidMount() {
        const hubConnection = new HubConnectionBuilder().withUrl('https://server/hubs/skribbl').build();
        this.setState({hubConnection}, () => {
            hubConnection
            .start()
            .then(() => {
                console.log('Connection established');
                hubConnection.on("ReceiveMessage", (message, connectionId) => {
                    this.setState({
                        incomingMessages: this.state.incomingMessages.concat(`${message} from ${connectionId}`)
                    });
                });

                hubConnection.onclose(() => {
                    this.setState({
                        error: new Error("The socket connection has been closed.")
                    })
                })
            })
            .catch((err: Error) => {
                this.setState({error: err})
                console.log(`Connection failed: ${err.message}`);
            });
        });
    }

    render(): ReactNode {
        return (
            <div>
                <h2 className="mt-4">Skribbl</h2>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-2">
                            <Chat hubConnection={this.state.hubConnection} messages={this.state.incomingMessages} user={this.state.user} />
                        </div>
                        <div className="col-md-10">
                            {
                                this.state.error
                                ? <div className="alert alert-danger">An error ocurred: {this.state.error.message}</div>
                                : null
                            }
                            <Canvas />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game
