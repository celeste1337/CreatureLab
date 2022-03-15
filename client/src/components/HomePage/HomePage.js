import React from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testcall: ''
        }
    }

    async componentDidMount() {
        const res = await fetch('/api/test');
        const msg = await res.json();
        this.setState({
            testcall:msg
        })
    }

    render() {
        return(
            <div className="routes">
                <Link to="/draw"><Button buttonText="Lets goooooo"></Button></Link>
                <Link to="/gallery"><Button buttonText="gallery"></Button></Link>
                    <p>{this.state.testcall}</p>
            </div>
        );
    }
}

export default HomePage;