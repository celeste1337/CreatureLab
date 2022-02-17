import React from "react";
import Button from '../Button';
import {Link} from "react-router-dom";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Link to="/draw"><Button buttonText="Lets goooooo"></Button></Link>
        );
    }
}

export default HomePage;