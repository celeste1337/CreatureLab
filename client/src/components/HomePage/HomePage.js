import React, { createRef, useRef } from "react";
import Button from '../Button';
import {Link} from 'react-router-dom';
import {config} from '../../utilities/constants.js';
import {instanceOf} from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import "./HomePage.css";
import logo from "../../data/assets/Logo.png";
import '@lottiefiles/lottie-player'
import {create} from '@lottiefiles/lottie-interactivity'
import {Player} from '@lottiefiles/react-lottie-player'

class HomePage extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        cookies.getAll();
        this.myRef = React.createRef();
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
                <div>
                    <Player autoplay={true} loop={true} src="https://assets1.lottiefiles.com/private_files/lf30_kxxu2cdj.json"></Player>
                </div>
                
                <Link style={{position: 'absolute', top: '70vh'}} to="/draw">Get Started!</Link>
            </div>
        );
    }
}

export default withCookies(HomePage);