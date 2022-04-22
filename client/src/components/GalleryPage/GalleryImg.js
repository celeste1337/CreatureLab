import React, {useState, useRef, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { render } from 'react-dom';
import './GalleryPage.css';
import hexToRgba from 'hex-to-rgba';

function GalleryImg(props) {
    const [image, setImage] = useState("");
    const [border, setBorder] = useState("");
    const [rotate, setRotate] = useState(0);

    useEffect(()=> {
        if(props.props.data.borderColor) {
            setBorder(hexToRgba(props.props.data.borderColor, 0.1))
        } else {
            setBorder('rgba(10,15,20,0.1)');
        }

        if(props.props.data.imageData) {
            setImage(props.props.data.imageData)
            setRotate(parseInt(Math.random () * 3))
        }
    }, [])


    if(image) {
        return (
            //this is so fugly
            //set rotate, make some negative if theyre equal
            <div className="galleryItem" style={{transform: `rotate(${rotate%2==0 ? rotate*-1 : rotate}deg)`, backgroundColor: `${border}`}}>
                <LazyLoadImage className="galleryImg"
                    src={image}
                    alt={props.props._id}
                    style={{border: `7px solid ${border}`}}>
                </LazyLoadImage>
                <p id="creatureCodeFinal">{props.props.creatureid}</p>
            </div>
        )
    } else {
        return (
            <div className="galleryItemBlank"></div>
        )
    }
}
        

export default GalleryImg;