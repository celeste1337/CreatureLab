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
    const [cookies, setCookie, removeCookie] = useCookies(['creatureId']);
    const [imageArray, updateImageArray] = useState([]);
    const [idArray, setIdArray] = useState([]);
    const [finalImg, setFinalImg] = useState("");
    const [borderColor, setBorderColor] = useState("");
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
    

    const getType = (creatureObj) => creatureObj.type;
    
    const removeCookieOnDone = () => removeCookie('creatureId');

    const getImageByID = async (creatureId) => {
        let img = await fetch(config.url.API_URL + '/getPart/' + creatureId, {signal});
        return img.json();
    };

    const getImageRandomType = async (type) => {
        let img = await fetch(config.url.API_URL + '/getRandomPart/' + type, {signal});
        return img.json();
    };

    const mergeThem = () => {
        if(imageArray && imageArray.length > 0) {
            mergeImages(imageArray, {
                //options
                //make it vertical
                direction:true,
                color: '#ffffff',
            }).then((img)=> {
                setFinalImg(img);
                //save to db :D
                saveFinalImage(img);
            })
        }
    }

    const fetchImages = async () => {
        //need to get initial creatureid via cookie
        console.log("fetching images :p");

        let tempArr = [];
        let base64Images = [];

        //note the double awaits. there are a lot of promises going on
        //even tho the awaits are blocking it we kinda want them to
        //bc we need to get the first image (the one the user drew) before we get the others
        //bc we use initimg to determine other types

        let initImg = await getImageByID(cookies.creatureId);

        const otherTypes = determineTypesLeft(getType(initImg));
        let otherparts = otherTypes.map(type => getImageRandomType(type))
        Promise.all(otherparts).then(vals => {
            tempArr = tempArr.concat(initImg, vals).flat()
            console.log(tempArr)

            tempArr.forEach((creature) => {
                //this kinda doesnt matter as long as it has a value -> itll rewrite itself but thats whatevs
                setBorderColor(creature.data.borderColor);
                setIdArray(prev=>[...prev, creature.creatureid])

                const setMe = (input) => input.replace("data:image/png;base64,","")

                console.log(creature);

                switch (getType(creature)) {
                    case 'Head':
                        base64Images[0] = setMe(creature.data.imageData);
                        break;
                    case 'Body':
                        base64Images[1] = setMe(creature.data.imageData);
                        break;
                    case 'Legs':
                        base64Images[2] = setMe(creature.data.imageData);
                        break;
                    default:
                        break;
                }
            });
            updateImageArray(base64Images);
        })
        
    }

    const saveFinalImage = () => {
        //start building data obj to send to the db :)
        if(idArray.length === 3) {
            let finalBase64 = finalImg;
            let finalCharCode = `${idArray[0]}-${idArray[1]}-${idArray[2]}`;
            let dataObj = {
                creatureid: finalCharCode,
                creatures: idArray,
                data: {
                    imageData: finalBase64,
                    borderColor: borderColor
                },
                createdOn: Date.now(),
            }
            let response = fetch(config.url.API_URL + '/saveCreature', {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-type':'application/json'
                }
            });
            console.log(response);
        }
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