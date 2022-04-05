import React from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';
import {config} from '../../utilities/constants.js';
import {instanceOf} from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class HomePage extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        cookies.getAll();
    }

    componentDidMount() {
        const {cookies} = this.props;
        if(cookies.get('creatureId')) {
            alert('somethings fucked up')
        }
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

export default withCookies(HomePage);