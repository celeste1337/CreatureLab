import React, {useState, useRef, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { render } from 'react-dom';

class GalleryImg extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        //return(<div>Hi</div>)
        return (<LazyLoadImage className="galleryImg" src={this.props.props.data.imageData} alt={this.props.props._id}></LazyLoadImage>)
    }
}

export default GalleryImg;