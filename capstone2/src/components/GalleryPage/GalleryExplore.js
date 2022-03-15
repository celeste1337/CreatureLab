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
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.state = {
            isScrolling: false,
            clientX: 0,
            clientY: 0,
            scrollX: 0,
            scrollY: 0,
            class: "notScrolling"
        }
    }

    onMouseDown({nativeEvent}) {
        this.setState({
            ...this.state, 
            isScrolling: true, 
            class: "scrolling",
            clientX: nativeEvent.clientX, 
            clientY: nativeEvent.clientY
        });

        console.log("mouse down");
        console.log(this.state);
    }

    onMouseUp() {
        this.setState({
            ...this.state,
            isScrolling: false,
            class: "notScrolling"
        });

        console.log("mouse up");
    }

    onMouseMove({nativeEvent}) {
        const { clientX, scrollX, clientY, scrollY } = this.state;
        if (this.state.isScrolling) {

          this.ref.current.scrollLeft = scrollX + nativeEvent.clientX - clientX;
          this.state.scrollX = scrollX + nativeEvent.clientX - clientX;
          this.state.clientX = nativeEvent.clientX;

          this.ref.current.scrollTop = scrollY + nativeEvent.clientY - clientY;
          this.state.scrollY = scrollY + nativeEvent.clientY - clientY;
          this.state.clientY = nativeEvent.clientY;
        }
      };
    

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

        const galleryImages = images.map(({key, src}) => {
            return <img key={key} src={src} alt={key}></img>
        });

        //console.log(images[0].src);

        return galleryImages;
    }

    render() {
        const { ref } = this.props;
        const rootClass = this.state.class;
        console.log("root class: ");
        console.log(rootClass);
        return (
            <div 
                ref={this.ref}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                className={rootClass} >
                {this.renderImages()}
            </div>
        )
    }
}

GalleryExplore.defaultProps = {
    ref: { current: {} },
    rootClass: '',
  };
  
  GalleryExplore.propTypes = {
    ref: PropTypes.object,
    rootClass: PropTypes.string,
    children: PropTypes.string,
  };

export default GalleryExplore;