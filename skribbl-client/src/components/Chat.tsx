import { HubConnection } from '@microsoft/signalr'
import React, { PureComponent, ReactNode } from 'react'
import { IncomingMessage, OutgoingMessage } from '../models/Messages';
import { UserModel } from '../models/User';

interface Props {
    // messages: Array<IncomingMessage>;
    messages: Array<string>;
    hubConnection: HubConnection | null;
    user: UserModel
}
interface State {
    outgoingMessage: string
}

class Chat extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        // let outgoingMessage: OutgoingMessage = {
        //     User: null,
        //     Message: ""
        // }

        this.state = {
            outgoingMessage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        this.setState({outgoingMessage: e.target.value});
    }
    
    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.props.hubConnection?.invoke("SendMessageToGroup", this.state.outgoingMessage);
        this.setState({
            outgoingMessage: ''
        });
    }

    render(): ReactNode {
        return (
            <div>
                <h2>Chat</h2>
                <ul className="unstyled">
                    {
                        this.props.messages.map((message: string, i) => {
                            return (
                                // <li key={i}>{message.User}: {message.Message} @ {message.Timestamp}</li>
                                <li key={i}>{message}</li>
                            );
                        })
                    }
                </ul>
                <div className="form-group">
                    <div className="form-group-row">
                        <input type="text" value={this.state.outgoingMessage} onChange={this.handleChange} placeholder="Enter a message" />
                        <button className="btn btn-sm btn-outline-primary" type="submit" onClick={this.handleSubmit} disabled={this.state.outgoingMessage === ''}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
