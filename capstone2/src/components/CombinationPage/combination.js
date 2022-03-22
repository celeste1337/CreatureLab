import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';
import mergeBase64 from 'merge-base64';

//import Canvas from '../DrawingPage/Canvas';
import mergeImages from 'merge-images';
import Creature1 from '../../data/creature2_head.png';
import Creature2 from '../../data/creature2_body.png';
import Creature3 from '../../data/creature2_legs.png';
import "../../App.css";
//import Canvas from '../DrawingPage/Canvas';
import { createCanvas, loadImage }  from 'canvas';

class CombinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {src: '', err: ''};
    }

    //helper function to get a random integer b/w 2 given numbers
    getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
    }


    componentDidMount = () => {
        mergeImages([Creature1, Creature2, Creature3])
          .then(src => this.setState({ src }))
          .catch(err => this.setState({ err: err.toString() }));
      };

    // get the images from the database
    getRandomImages() {
        //max and min are placeholders. Min = smallest key in API, max = largest key in API
        let max = 100
        let min = 1;
        let randInteger = Math.floor(Math.random() * (max - min) ) + min;
        
        console.log(randInteger);
        
        //Random body part
        let randParts = ['head','body','legs'];
        let creaturePart = randParts[Math.floor(Math.random() * randParts.length)];

        console.log(creaturePart);


        //need to load in each image from the api into the array so that they 
        //can be displayed and saved properly 
        //the src will be in base64 when recieved from the database
        const imgArray = [
            {bType: 'head', key:"001", src:Creature1},
            {bType: 'body', key:"002", src:Creature2},
            {bType: 'legs', key:"003", src:Creature3},
        ];
        return imgArray;
    }

    renderImages() {
        //Get img data from database
        /* base64 image string
        const images = [
            {bType: 'head', key:"001", src:Creature1},
            {bType: 'body', key:"002", src:Creature2},
            {bType: 'legs', key:"003", src:Creature3}
        ];*/

        const images = this.getRandomImages();


        //merge the images together
        /*mergeImages([
            {src:"../../data/creature2_head.png", x: 0, y: 0 }, 
            {src:"../../data/creature2_body.png", x: 500, y: 500 }, 
            {src:"../../data/creature2_legs.png", x: 1000, y: 1000 }], 
            {
            Canvas: createCanvas,
            Image: loadImage
          })
            .then((b64) => {
                    document.querySelector('img.abc').src = b64;
        })
        .catch(error => console.log(error))
        
            mergeImages([
            {src:"../../data/creature2_head.png", x: 0, y: 0 }, 
            {src:"../../data/creature2_body.png", x: 500, y: 500 }, 
            {src:"../../data/creature2_legs.png", x: 1000, y: 1000 }
        ])
        .then(b64 => document.querySelector('img').src = b64);*/


        //combine the images 
        const combineImages = images.map(({key, src, bType}) => {
        
            return <img key={key} src={src} alt={bType + '_' + key} width="400px" ></img>
        });

        console.log(combineImages);
/*
        combineImages.forEach(element => {

            console.log(element.props.src);
        });*/
        
        return combineImages;
    }//end render images

    saveImages(){
        
    }

    displayBase64Image(base64Image) {
        
        return <img src={base64Image} alt={'Creature Image'} width="50%" ></img>
    }

    render() {
        return(
            <div className="combinePage">
                <div id = "combinedImage">
                    {this.renderImages()}
                </div>
            </div> 
        );
    }
}

export default CombinePage;