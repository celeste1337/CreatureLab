import React, { useEffect, useState } from 'react';
import { withCookies, useCookies } from 'react-cookie';
import {Player, Controls} from '@lottiefiles/react-lottie-player';
import {Link, Navigate} from 'react-router-dom';

import {config} from '../../utilities/constants';
import { useFirstRender } from './FirstRenderHook';

//why does it do this.
const mergeImages = require('merge-base64');


function CombinationPage(props) {
    //were using react hooks just for fun/to learn about them here
    const [cookies, setCookie, removeCookie] = useCookies(['creatureId'])
    const [imageArray, updateImageArray] = useState([]);
    const [finalImg, setFinalImg] = useState("");
    const firstRender = useFirstRender();
    const controller = new AbortController();
    const signal = controller.signal;

    //on init
    useEffect(() => {
        //this runs every time imageArray is changed
        //imageArray gets changed when we have all the images
        if(!finalImg) {
            //finalimg here is the src attribute of the final image
            mergeThem();
        }
        //cleanup :DDDDD
        return () => {
            controller.abort();
        }
    }, 
    //empty array here indicates what props to reload on
    [imageArray])
    
    const determineTypesLeft = (type) => ["Head", "Body", "Legs"].filter(item => type !== item);

    const getType = (creatureObj) => creatureObj ? creatureObj.type : null;
    
    const removeCookieOnDone = () => removeCookie('creatureId');

    const getImageByID = async (creatureId) => {
        let initImg = await fetch(config.url.API_URL + '/getPart/' + creatureId, {signal});
        let response = await initImg.json();
        return response;
    };

    const getImageRandomType = async (type) => {
        let img = await fetch(config.url.API_URL + '/getRandomPart/' + type, {signal});
        let response = await img.json();
        return response;
    };

    const getOtherImages = async (arr) => arr.map(type => getImageRandomType(type));

    const mergeThem = async () => {
        if(imageArray && imageArray.length > 0) {
            mergeImages(imageArray, {
                //options
                //make it vertical
                direction:true,
                color: '#ffffff'
            }).then((img)=> {
                setFinalImg(img)
            })
        }
    }

    const fetchImages = async () => {
        //need to get initial creatureid via cookie
        console.log("fetching images :p");

        let tempArr = [];

        //note the double awaits. there are a lot of promises going on
        //even tho the awaits are blocking it we kinda want them to
        //bc we need to get the first image (the one the user drew) before we get the others
        //bc we use initimg to determine other types
        let initImg = await getImageByID(cookies.creatureId)
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
                switch (getType(imageObj)) {
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

    const checkCookies = (obj) => Object.keys(obj).length !== 0; //if cookie return true

    if(!checkCookies(cookies)) {
        //see if they have the cookie w their creature id
        //if no cookies, redir to home
        console.log('no cookies?')
        return (<Navigate to="/"></Navigate>)
    }

    if(firstRender) {
        console.log("first render :D")
        fetchImages();
    }
  
    return(
        <div className="combinationPageWrapper">
            
            <div>
                {!finalImg && 
                    <Player
                    autoplay
                    loop
                    src="https://assets7.lottiefiles.com/private_files/lf30_eh7nrprb.json"
                    style={{ height: '300px', width: '300px'}}></Player>
                }
                <img src={finalImg}></img></div>
                <div className="creatureCodeBox">Your creature's code </div>
                <Link to="/" onClick={removeCookieOnDone}>Done</Link>
            
        </div>
    );
}

export default withCookies(CombinationPage);