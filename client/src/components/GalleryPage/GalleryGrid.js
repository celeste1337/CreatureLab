import React, {useState, useRef, useEffect} from 'react';
import Creature1 from '../../data/assets/creature1.PNG';
import Creature2 from '../../data/assets/creature2.png';
import Creature3 from '../../data/assets/creature3.png';
import Creature4 from '../../data/assets/creature4.png';
import Creature5 from '../../data/assets/creature5.png';

class GalleryGrid extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            images: [
                {key:"080910", src:Creature1},
                {key:"080911", src:Creature2},
                {key:"080912", src:Creature3},
                {key:"080913", src:Creature4},
                {key:"080914", src:Creature5},
                {key:"080915", src:Creature1},
                {key:"080916", src:Creature2},
                {key:"080917", src:Creature3},
                {key:"080918", src:Creature4},
                {key:"080919", src:Creature5},
                {key:"080920", src:Creature1},
                {key:"080921", src:Creature2},
                {key:"080922", src:Creature3},
                {key:"080923", src:Creature4},
                {key:"080924", src:Creature5},
                {key:"080925", src:Creature1},
                {key:"080926", src:Creature2},
                {key:"080927", src:Creature3},
                {key:"080928", src:Creature4},
                {key:"080929", src:Creature5},
                {key:"080930", src:Creature1},
                {key:"080931", src:Creature2},
                {key:"080932", src:Creature3},
                {key:"080933", src:Creature4},
                {key:"080934", src:Creature5},
            ]
        }
    }

    retrieveImages() {
        // let response = fetch(config.url.API_URL + '/getAll', {
        //     method: 'GET',
        //     headers: {
        //         'Content-type':'application/json'
        //     }
        // });

        
    }
 
    renderGrid() {
        const gridImages = this.state.images.map(({key, src}) => {
            return <img className="galleryImage" key={key} src={src} alt={key}></img>
        });

        return gridImages;
    }

    render() {
        return (
            <div className="galleryGrid"
                ref={this.ref}>
                    {this.renderGrid()}
            </div>
        )
    }
}

export default GalleryGrid;