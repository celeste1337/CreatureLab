import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    // get the images from the database
    retrieveImages() {
        const imgArray = [
            {key="080910", src="../../public/"},
        ];
        return imgArray;
    }

    renderImages() {
        const images = retrieveImages();

        const galleryImages = images.map(({key, src}) => {
            return <GalleryImg key={key} img={src} alt={key}></GalleryImg>
        });

        return galleryImages;
    }

    render() {
        return(
            <div className="galleryPage">
                {this.renderImages()}
            </div> 
        );
    }
}

export default galleryPage;