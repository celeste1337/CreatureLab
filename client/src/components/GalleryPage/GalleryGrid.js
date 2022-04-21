import React, { useState, useRef, useEffect } from 'react';
import { config } from '../../utilities/constants';
import GalleryImg from './GalleryImg';
import { FixedSizeList as List } from 'react-window';
import {Player} from '@lottiefiles/react-lottie-player'

function GalleryGrid(props) {
    const [imageResponse, setImageResponse] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const retrieveImages = async () => {
        const response = await fetch(config.url.API_URL + '/getAllCreatures').catch((err) => console.log(err));

        const json = await response.json();
        
        setImageResponse(json);
    }

    const searchImages = async () => {
        if(searchTerm) {
            const response = await fetch(config.url.API_URL + '/find/' + searchTerm).catch((err) => console.error(err));

            const json = await response.json();

            if(json.length > 0) {
                setImageResponse(json);
            } else {
                setErrMsg("Your search didn't come up with any results.")
            }
        } else {
            setErrMsg("Something went wrong with your search! Try again.")
        }
    }

    const renderError = () => {
        if(errMsg) {
            return (<div className="error">{errMsg}</div>)
        }
    }

    const search = (e) => {
        setImageResponse([]);
        setSearchTerm(e.target[0].value);
        //grab text box value
        //search
        //chuck it into render stuff qB)
    }

    const renderstuff = () => {
        if(imageResponse) {
            let arr = [];
            imageResponse.map((data, _id) => {
                //console.log(data)
                arr.push(<GalleryImg key={_id} props={data}></GalleryImg>)
            });
    
            return arr;
        }
    }

    const renderLoader = () => {
                return(<Player
                    className="loading"
                    autoplay
                    src="https://assets2.lottiefiles.com/private_files/lf30_hbmgptwa.json"></Player>)}
    
    useEffect(() => { 
        //every time search term updates
        //we wanna search and rerender
        if(searchTerm) {
            //search
            searchImages();
        }
        
    }, [searchTerm])


    if(!searchTerm && !imageResponse.length > 0) {
        retrieveImages();
    }

    return (
        <div className="galleryGrid">
            {errMsg.length > 0 ? renderError() : null}
            <div className="search">
                <form onSubmit={(e) => {e.preventDefault(); search(e)}}>
                    <input type="text" name="search" id="searchInput" placeholder="Find your creature"/>
                    <input type="submit" value="Search" />
                    <input type="button" value="Refresh" onClick={(e) => {e.preventDefault(); retrieveImages();}}/>
                </form>
            </div>
            <div className="grid">
                {imageResponse.length > 0 ? renderstuff() : renderLoader()}
            </div>
            
        </div>
    )
}

export default GalleryGrid;