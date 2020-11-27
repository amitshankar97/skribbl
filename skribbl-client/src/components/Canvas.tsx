import React, { PureComponent, ReactNode } from 'react'

interface Props {}
interface State {}

class Canvas extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render(): ReactNode {
        return (
            <div style={{border: "1px solid", height: "400px"}}>

            </div>
        )
    }
}

export default Canvas
