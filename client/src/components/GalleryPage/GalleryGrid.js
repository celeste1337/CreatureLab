import React, { useState, useRef, useEffect } from 'react';
import { config } from '../../utilities/constants';

class GalleryGrid extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {

        }
    }

    async retrieveImages() {
        const response = await fetch(config.url.API_URL + '/getAll', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const json = await response.json();

        //console.log(json);

        const imageGrid = json.map(({ _id, data }) => {
            return <img className="galleryImage" key={_id} src={data.imageData} alt={_id} loading='lazy'></img>
        });

        console.log("imageGrid: ");
        console.log(imageGrid);

        return imageGrid;
    }

    // renderGrid(images) {
    //     const gridImages = this.retrieveImages();

    //     console.log(gridImages);

    //     return gridImages.map(({_id, data}) => {
    //         return <img className="galleryImage" key={_id} src={data.imageData} alt={_id} loading='lazy'></img>
    //     });
    // }

    render() {
        return (
            <div ref={this.ref} className="galleryGrid">
                {this.retrieveImages()}
            </div>
        )
    }
}

export default GalleryGrid;