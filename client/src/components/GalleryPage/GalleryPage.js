import React from 'react';
import GalleryGrid from './GalleryGrid';
import './GalleryPage.css';
import logo from './../../data/assets/Logo.png'
//import ScrollContainer from 'react-indiana-drag-scroll';

class GalleryPage extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    } 
    
    
    componentDidMount() {

    }
 
    render() {
        // if gallery is in grid mode
        return (
            <div className="galleryPage">
                <div className="logoBar"><img src={logo}/></div>
                <div className="banner">
                    <h1>Explore the <span className="purpleP">limitless</span> creativity</h1>
                    <p>Enter your creation code down below to see your creatures.</p>
                    <a href='#gallery'>Click</a>
                </div>
                <div id="gallery">
                    <GalleryGrid>
                    </GalleryGrid>
                </div>
            </div>
        )
    }
}

export default GalleryPage;