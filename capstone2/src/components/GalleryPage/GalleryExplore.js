import React, {useState, useRef, useEffect} from 'react';
import Creature1 from '../../data/creature1.PNG';
import Creature2 from '../../data/creature2.PNG';
import Creature3 from '../../data/creature3.PNG';
import Creature4 from '../../data/creature4.PNG';
import Creature5 from '../../data/creature5.PNG';
import PropTypes from 'prop-types';

// class GalleryExplore extends React.Component {
//     constructor(props) {
//         super(props);
//         this.ref = React.createRef();
//         this.onMouseDown = this.onMouseDown.bind(this);
//         this.onMouseUp = this.onMouseUp.bind(this);
//         this.onMouseMove = this.onMouseMove.bind(this);
//         this.state = {
//             clientX: 0,
//             clientY: 0,
//             scrollX: 0,
//             scrollY: 0,
//             isScrolling: false,
//             class: "notScrolling"
//         }
//     }

//     onMouseDown({nativeEvent}) {
//         this.setState({
//             ...this.state, 
//             isScrolling: true, 
//             class: "scrolling",
//             clientX: nativeEvent.clientX, 
//             clientY: nativeEvent.clientY
//         });

//         //console.log("mouse down");
//         //console.log(this.state);
//     }

//     onMouseUp() {
//         this.setState({
//             ...this.state,
//             isScrolling: false,
//             class: "notScrolling"
//         });

//         //console.log("mouse up");
//     }

//     onMouseMove({nativeEvent}) {
//         const { clientXc, scrollXc, clientYc, scrollYc } = this.state;
//         if (this.state.isScrolling) {

//           //this.ref.current.scrollLeft = scrollX + nativeEvent.clientX - clientX;
//         //   this.ref.current.scrollTop += 1;
//         //   console.log("top += 1");
//         //   this.state.scrollX = scrollXc + nativeEvent.clientX - clientXc;
//         //   this.state.clientX = nativeEvent.clientX;

//           this.setState({ scrollX: scrollXc + nativeEvent.clientX - clientXc,
//             clientX: nativeEvent.clientX }, () => {
//                 //this.ref.current.scrollLeft = scrollXc + nativeEvent.clientX - clientXc;
//                 this.ref.current.scrollLeft++;
//             })

//         //   this.ref.current.scrollTop = scrollY + nativeEvent.clientY - clientY;
//         //   this.state.scrollY = scrollY + nativeEvent.clientY - clientY;
//         //   this.state.clientY = nativeEvent.clientY;
//         }
//       };
    

//     // get the images from the database
//     retrieveImages() {
//         const imgArray = [
//             {key:"080910", src:"../../data/creature1.PNG"},
//         ];
//         return imgArray;
//     }

//     renderImages() {
//         //const images = retrieveImages();
//         const images = [
//             {key:"080910", src:Creature1},
//             {key:"080911", src:Creature2},
//             {key:"080912", src:Creature3},
//             {key:"080913", src:Creature4},
//             {key:"080914", src:Creature5},
//         ];

//         const galleryImages = images.map(({key, src}) => {
//             return <img key={key} src={src} alt={key}></img>
//         });

//         //console.log(images[0].src);

//         return galleryImages;
//     }

//     attachScroller = (scroller) => {
//         this._scroller = React.findDOMNode(galleryExplore);
//       };

//     render() {
//         const { ref } = this.props;
//         const rootClass = this.state.class;
//         //console.log("root class: ");
//         //console.log(rootClass);
//         return (
//             <div 
//                 ref={this.attachScroller}
//                 onMouseDown={this.onMouseDown}
//                 onMouseUp={this.onMouseUp}
//                 onMouseMove={this.onMouseMove}
//                 className="galleryExplore" >
//                 {this.renderImages()}
//             </div>
//         )
//     }
// }

// GalleryExplore.defaultProps = {
//     ref: { current: {} },
//     rootClass: '',
//   };
  
//   GalleryExplore.propTypes = {
//     ref: PropTypes.object,
//     rootClass: PropTypes.string,
//     children: PropTypes.string,
//   };

// export default GalleryExplore;

class GalleryExplore extends React.Component {

state = {isScrolling: false};

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

  componentWillUpdate = (nextProps, nextState) =>{
     if(this.state.isScrolling !== nextState.isScrolling ) {
       this.toggleScrolling(nextState.isScrolling);
      }
  };

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    } else {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  };

  onScroll = (event) => {
  };

  onMouseMove = (event) => {
    const {clientX, scrollLeft, scrollTop, clientY} = this.state;
    this._scroller.scrollLeft = scrollLeft - clientX + event.clientX;
    this._scroller.scrollTop = scrollTop - clientY + event.clientY;
  };

  onMouseUp =  () => {
    this.setState({isScrolling: false, 
                   scrollLeft: 0, scrollTop: 0,
                   clientX: 0, clientY:0});
  };

  onMouseDown = (event) => {
    const {scrollLeft, scrollTop} = this._scroller;
    this.setState({isScrolling:true, scrollLeft, scrollTop, clientX:event.clientX, clientY:event.clientY});
  };

  attachScroller = (scroller) => {
    this._scroller = React.findDOMNode(scroller);
  };

  render() {
    return <div className='container'>
      <div className="scroller"
        ref={this.attachScroller}
        onMouseDown={this.onScroll}
        onScroll={this.onMouseMove}
        >
        <div className="child"/>
        {this.renderImages()}
        </div>
    </div>;
  }
}

export default GalleryExplore;