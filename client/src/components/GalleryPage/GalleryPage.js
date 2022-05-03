import React from 'react';
import GalleryGrid from './GalleryGrid';
import './GalleryPage.css';
import logo from './../../data/assets/Logo.png';
import creature1 from './../../data/assets/creature1_x170.jpg';
import creature2 from './../../data/assets/creature2_x150.jpg';
import creature3 from './../../data/assets/creature3.jpg';
import creature4 from './../../data/assets/creature4.jpg';
//import ScrollContainer from 'react-indiana-drag-scroll';
import { ReactComponent as DownArrow } from '../../data/assets/DownArrow.svg';

class GalleryPage extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    } 
    
 
    render() {
        // if gallery is in grid mode
        return (
            <div className="galleryPage">
                <div className="logoBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <img src={logo}/>
                    <div className="navLinks">
                        <a href="/home" className="navLink" style={{paddingTop: '10px', marginRight: '20px', textDecoration: 'none',}}>Drawing Experience</a>
                        <a href="https://designed.cad.rit.edu/nmcapstone/project/creaturelab" target="_blank" className="navLink" style={{paddingTop: '10px', textDecoration: 'none'}}>About</a>
                    </div>
                </div>
                <div className="imagesOne">
                    <img src={creature1} className="creature1" />
                    <img src={creature2} className="creature2" />
                </div>
                <div className="banner">
                    <h1 className="galleryHeading">Explore the<br></br> <span className="purpleP">limitless</span> creativity</h1>
                    <p>Enter your creation code down below to see your creatures.</p>
                    <a className="letsGo" href='#gallery'><DownArrow></DownArrow></a>
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