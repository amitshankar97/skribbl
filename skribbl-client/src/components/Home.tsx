import React, { Component } from 'react'
import Logo from '../images/logo.jpeg';

interface Props {
    
}
interface State {
    name: string;
}

export default class Home extends Component<Props, State> {
    state = {
        name: ''
    }

    render() {
        return (
            <div>
                <img src={Logo} alt="Skribbl Logo" height={200} />
                <div style={{border: '1px solid'}}>
                    New Game
                </div>
                <div style={{border: '1px solid'}}>
                    Join Game
                </div>
            </div>
        )
    }
}
