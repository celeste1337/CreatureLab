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
        const element = this.ref.current;
        if (element) {
            element.scrollTop = (element.scrollHeight - element.clientWidth) / 2;
            element.scrollLeft = (element.scrollWidth - element.clientHeight) / 2;
        }
    }
 
    render() {
        // if gallery is in grid mode
        return (
            <div className="galleryPage">
                <div className="logoBar"><img src={logo}/></div>
                <div className="banner">
                    <h1>Explore the <span className="purpleP">limitless</span> creativity</h1>
                    <p>Enter your creation code down below to see your creatures.</p>
                </div>
                    <GalleryGrid>
                    </GalleryGrid>
            </div>
        )
    }
}

export default GalleryPage;