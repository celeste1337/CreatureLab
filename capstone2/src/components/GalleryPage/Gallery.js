import React from "react";
import GalleryImg from './GalleryImg';
import Creature1 from '../../data/creature1.PNG';

class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        
        this.pos = {top: 0, left: 0, x: 0, y: 0};
        this.scrollTop = 100;
        this.scrollLeft = 150;
    }

    onMouseDown({nativeEvent}) {
        const {offsetX, offsetY} = nativeEvent;

        this.pos = {
            top: this.scrollTop,
            left: this.scrollLeft,

            x: offsetX,
            y: offsetY
        }

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    // scroll handlers
    onMouseMove() {
        const dx = this.clientX - this.pos.x;
        const dy = this.clientY - this.pos.y;

        this.scrollTop = this.pos.top - dy;
        this.scrollLeft = this.pos.left - dx;
    }

    onMouseUp() {
        this.onMouseMove = this.onMouseMove.unbind(this);
        this.onMouseUp = this.onMouseUp.unbind(this);

        
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
        ];

        const galleryImages = images.map(({key, src}) => {
            return <img key={key} src={src} alt={key}></img>
        });

        console.log(images[0].src);

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

export default GalleryPage;
