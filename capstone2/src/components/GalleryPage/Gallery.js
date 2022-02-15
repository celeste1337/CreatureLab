import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    renderImages() {
        return (
            <GalleryImg ></GalleryImg>
        )
    }

    render() {
        return(
            <div className="galleryPage">
                {this.renderImages()}
            </div>
        );
    }
}