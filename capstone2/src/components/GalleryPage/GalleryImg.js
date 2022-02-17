import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

class GalleryImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <img src={this.src} alt={this.key}></img>;
    }
}

export default GalleryImg;