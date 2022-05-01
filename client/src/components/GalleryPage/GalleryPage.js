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
    
 
    render() {
        // if gallery is in grid mode
        return (
            <div className="galleryPage">
                <div className="logoBar" style={{display: 'flex', justifyContent: 'space-between'}}><img src={logo}/><a href="/home" style={{paddingTop: '10px', textDecoration: 'none'}}>Drawing Experience</a></div>
                <div className="banner">
                    <h1>Explore the <span className="purpleP">limitless</span> creativity</h1>
                    <p>Enter your creation code down below to see your creatures.</p>
                    <a className="letsGo" href='#gallery'>Let's go!</a>
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