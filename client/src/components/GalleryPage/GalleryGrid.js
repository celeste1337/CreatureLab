import React, { useState, useRef, useEffect } from 'react';
import { config } from '../../utilities/constants';
import GalleryImg from './GalleryImg';
import { FixedSizeList as List } from 'react-window';

class GalleryGrid extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            imageResponse: [],
        }
        this.isLoaded = false;
    }

    async retrieveImages() {

        const response = await fetch(config.url.API_URL + '/getAllCreatures').catch((err) => console.log(err));
        //debugger;
        console.log(response)

        const json = await response.json();

        if (json) {
            this.isLoaded = true;
            console.log(this.isLoaded);
        };
        console.log(json);
        this.setState({imageResponse: json})

    }

    renderstuff(json) {
        let arr = [];
        json.map((data, _id) => {
            //console.log(data)
            arr.push(<GalleryImg key={_id} props={data}></GalleryImg>)
        });
        console.log(arr);
        return arr;
    }

    // componentDidMount() {
    //     this.retrieveImages();
    // }

    // renderGrid(images) {
    //     const gridImages = this.retrieveImages();

    //     console.log(gridImages);

    //     return gridImages.map(({_id, data}) => {
    //         return <img className="galleryImage" key={_id} src={data.imageData} alt={_id} loading='lazy'></img>
    //     });
    // }

    render() {
        this.retrieveImages();
        return (
            <div ref={this.ref} className="galleryGrid">
                {this.isLoaded ? this.renderstuff(this.state.imageResponse) : []}
            </div>
        )
    }
}

export default GalleryGrid;