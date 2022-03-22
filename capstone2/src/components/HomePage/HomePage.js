import React from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="routes">
                <Link to="/draw"><Button buttonText="Lets goooooo"></Button></Link>
                <Link to="/gallery"><Button buttonText="gallery"></Button></Link>
                <Link to="/combine"><Button buttonText="combine"></Button></Link>
            </div>
        );
    }
}

export default HomePage;