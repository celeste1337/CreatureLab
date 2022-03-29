import React, { useEffect, useState } from 'react';
import { withCookies, useCookies } from 'react-cookie';
import {config} from '../../utilities/constants';
//why does it do this.
const mergeImages = require('merge-base64');


function CombinationPage(props) {
    //were using react hooks just for fun/to learn about them here
    const [creatureIdCookie, setCreatureIdCookie] = useCookies(['creatureId']);
    const [imageArray, updateImageArray] = useState([]);
    
    const makeFinalImage = () => {
        async function mergeArray(arr) {
            let mergedImage = await mergeImages(imageArray, {direction: true});

            console.log(mergedImage);
        }

        mergeArray(imageArray);
    }

    const addImage = (img) => {
        //
        //adds an image to our image array -> we are building an array of db objects
        //that we can reference to build the final data obj
        //
        updateImageArray(arr=> [...arr, img])
    }
    
    //on init
    useEffect(() => {
        //get initial image data and set that
        async function fetchImages() {
            //need to get initial creatureid via cookie
            console.log("fetching images :p");
            
            const creatureId = creatureIdCookie.creatureId;

            let initImg = await fetch(config.url.API_URL + '/getPart/'+'Tq5g')
            let response = await initImg.json();
            //now that we have the creature they drew
            //we need to get the other body parts
            //get body part user drew
            

            //add their bodypart to the image array ha ha ha
            addImage(response);

            //now get some random images
            //this is temporarily hardcoded lol
            let second = await fetch(config.url.API_URL + '/getRandomPart/' + 'Head');
            let responseSecond = await second.json();
            console.log(responseSecond);
            
        }

        fetchImages();
    }, 
    //empty array here indicates what props to reload on
    [])
    
    return(
        <div className="combinationPageWrapper">
            <h1>hey bestie lol</h1>
        </div>
    );
}

export default withCookies(CombinationPage);