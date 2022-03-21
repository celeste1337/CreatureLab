import React, {useState, useRef, useEffect} from 'react';
import Creature1 from '../../data/creature1.PNG';
import Creature2 from '../../data/creature2.PNG';
import Creature3 from '../../data/creature3.PNG';
import Creature4 from '../../data/creature4.PNG';
import Creature5 from '../../data/creature5.PNG';
import PropTypes from 'prop-types';

class GalleryExplore extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            
        }
    }
    

    // get the images from the database
    retrieveImages() {
        const imgArray = [
            {key:"080910", src:"../../data/creature1.PNG"},
        ];
        return imgArray;
    }

    renderImages() {
        //const images = retrieveImages();
        const images = [
            {key:"080910", src:Creature1},
            {key:"080911", src:Creature2},
            {key:"080912", src:Creature3},
            {key:"080913", src:Creature4},
            {key:"080914", src:Creature5},
        ];

        console.log(images[3].key);

        // var galleryImages;

        // for (let i = 0; i < images.length; i++) {
        //     let image = i % 5;
        //     galleryImages += <img key={images[image].key} src={images[image].src} alt={images[image].key}></img>;
        // }
    

        const galleryImages = images.map(({key, src}) => {
            return <img key={key} src={src} alt={key}></img>
        });

        //console.log(images[0].src);

        return galleryImages;
    }

    render() {
        
        return (
            <div 
                ref={this.ref}
                className="galleryExplore" >
                {this.renderImages()}
            </div>
        )
    }
}

export default GalleryExplore;