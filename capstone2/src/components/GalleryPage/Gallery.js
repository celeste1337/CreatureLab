import React from "react";


class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.images = require.context('../../public/test-game', true);
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
