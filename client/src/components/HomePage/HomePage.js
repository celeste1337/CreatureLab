import React from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const res = await fetch('/getAll');
        const msg = await res.json();
        console.log(msg);
    }

    render() {
        return(
            <div className="routes">
                <h2>Explore your creativity</h2>
                <Link to="/draw">Draw</Link>
                <Link to="/gallery"><Button buttonText="gallery"></Button></Link>
            </div>
        );
    }
}

export default HomePage;