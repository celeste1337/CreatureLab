import React from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';
import {config} from '../../utilities/constants.js';
import {instanceOf} from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import "./HomePage.css";
import logo from "../../data/assets/Logo.png";

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
            //you have a cookie already set
            cookies.remove('creatureId');
        }
    }

    render() {
        return(
            <div className="homePage">
                <h2>Discover the power of creative collaboration</h2>
                <img id="logo" src={logo}></img>
                <Link to="/draw">Get Started!</Link>
            </div>
        );
    }
}

export default withCookies(HomePage);