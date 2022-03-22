import React from 'react';
import GalleryExplore from './GalleryExplore';
//import GalleryGrid frmo './GalleryGrid';
import ScrollContainer from 'react-indiana-drag-scroll';

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
        // if gallery is in explore mode
        return (
            <ScrollContainer 
                className="scrollContainer"
                nativeMobileScroll={false}
                ref={this.ref}>
                <GalleryExplore>
                
                </GalleryExplore>
            </ScrollContainer>
        )
    }
}

export default GalleryPage;