import React, { useEffect, useState } from 'react';
import { withCookies, useCookies } from 'react-cookie';
import {config} from '../../utilities/constants';
import { useFirstRender } from './FirstRenderHook';
//why does it do this.
const mergeImages = require('merge-base64');


function CombinationPage(props) {
    //were using react hooks just for fun/to learn about them here
    const [creatureIdCookie, setCreatureIdCookie] = useCookies(['creatureId']);
    const [imageArray, updateImageArray] = useState([]);
    const [finalImg, setFinalImg] = useState("");
    const firstRender = useFirstRender();
    
    const determineTypesLeft = (type) => {
        const bodyTypes = ["Head", "Body", "Legs"];
        return bodyTypes.filter(item => type !== item);
    }

    const getType = (creatureObj) => {
        return creatureObj.type;
    };

    const getImageByID = async (creatureId) => {
        let initImg = await fetch(config.url.API_URL + '/getPart/' + creatureId)
        let response = await initImg.json();
        return response;
    };


    const getImageRandomType = async (type) => {
        let img = await fetch(config.url.API_URL + '/getRandomPart/' + type);
        let response = await img.json();
        return response;
    };

    const getOtherImages = async (arr) => {
        return arr.map(type => getImageRandomType(type))
    }

    const mergeThem = async () => {
        if(imageArray && imageArray.length > 0) {
            mergeImages(imageArray, {
                //options
                //make it vertical
                direction:true,
                color: '#ffffff'
            }).then((img)=> {console.log(img);
            setFinalImg(img)
            })
        }
    }

    const fetchImages = async () => {
        //need to get initial creatureid via cookie
        console.log("fetching images :p");

        let tempArr = [];

        //note the double awaits. there are a lot of promises going on
        let initImg = await getImageByID(creatureIdCookie.creatureId)
        let firstImg = await initImg;

        const otherTypes = determineTypesLeft(getType(firstImg));
        const otherParts = await getOtherImages(otherTypes);

        let otherImgs = await otherParts;

        Promise.all(otherImgs).then((val) => {
            tempArr = [firstImg, ...val].flat();
            
            //now we have an array of all the images we use!! cool but its unordered :/
            //we need to pass in base64 strings to merge them
            let base64Images = [];

            //sorry this sucks i will rewrite this later, i just need the first part of the base64 taken out
            const setMe = (input) => input.replace("data:image/png;base64,","")
            
            tempArr.map(imageObj => {
                switch (imageObj.type) {
                    case 'Head':
                        base64Images[0] = setMe(imageObj.data.imageData);
                        break;
                    case 'Body':
                            base64Images[1] = setMe(imageObj.data.imageData);
                            break;
                    case 'Legs':
                    
                        base64Images[2] = setMe(imageObj.data.imageData);
                        break;
                    default:
                        break;
                }
            })

            updateImageArray(base64Images);
        })

    }

    
    //on init
    useEffect(() => {
        //get initial image data and set that
        if(firstRender) {
            fetchImages();
        }
        
        
        mergeThem()
    }, 
    //empty array here indicates what props to reload on
    [firstRender, imageArray])
    
    return(
        <div className="combinationPageWrapper">
            <h1>hey bestie lol</h1>
            <div><img src={finalImg}></img></div>
        </div>
    );
}

export default withCookies(CombinationPage);