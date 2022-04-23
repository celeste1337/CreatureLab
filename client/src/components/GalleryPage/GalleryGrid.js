import React, { useState, useRef, useEffect } from 'react';
import { config } from '../../utilities/constants';
import GalleryImg from './GalleryImg';
import { FixedSizeList as List } from 'react-window';
import {Player} from '@lottiefiles/react-lottie-player'

function GalleryGrid(props) {
    const [imageResponse, setImageResponse] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [lastId, setLastId] = useState('');
    const [isLoaded, setLoaded] = useState(false);
    const [stopCalling, setStop] = useState(false);
    const [searchFor, setSearchFor] = useState(false);
    let myRef = useRef(null);
    let gridContainer = useRef(null);

    const retrieveImages = async () => {
        const response = await fetch(config.url.API_URL + '/getInitialCreature').catch((err) => console.log(err));

        const json = await response.json();
        if(stopCalling == false) {
            setLoaded(true);
            setLastId(json[json.length-1]._id);
        
            setImageResponse(json);
        }
    }

    const getMoreImages = async () => {
        if(lastId) {
            const response = await fetch(config.url.API_URL + '/getSomeCreatures/' + lastId).catch((err) => console.log(err));
            const json = await response.json();
            setLoaded(true);
            console.log(json.length)
            if(json.length <= 1) {
                setStop(true);
            // console.log(imageResponse.length)
            } else {
                if(stopCalling == false) {
                    setLastId(json[json.length-1]._id)
                    
                    let returndata = json.filter((item) => item.data.imageData.length > 0)
                
                    setImageResponse(imageResponse => [...imageResponse, ...returndata]);
                }
               
            }
        }
    }

    const clearGrid = () => {
        while(gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }

    const searchImages = async () => {
        if(searchTerm.length > 0 && searchFor === true) {
            const response = await fetch(config.url.API_URL + '/find/' + searchTerm).catch((err) => console.error(err));
            setSearchFor(false);
            setSearchTerm("");

            const json = await response.json();

            if(json.length > 0) {
                let returndata = json.filter((item) => item.data.imageData.length > 0)

                setImageResponse(returndata);

                setSearchFor(false);
            } else {
                setImageResponse([]);
                clearGrid();
                setErrMsg("Your search didn't come up with any results.")
                clearGrid();
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
        setStop(true);
        setImageResponse([])
        clearGrid();
        setSearchTerm(e.target[0].value);
        setSearchFor(true);
    }

    const renderstuff = () => {
        //debugger;
        //clearGrid();
        if(searchFor && searchTerm.length > 0) {
            //were searching for stuff
            if(imageResponse.length == 0) {
                //they found no results lmfao
                //do nothing
                setSearchFor(false);
                setSearchTerm("")
                return;
            } else if (!imageResponse[0].creatureid.includes(searchTerm)) {
                setImageResponse([])
                setSearchTerm("")
                clearGrid();
                return;
            }
        }
        if(isLoaded === true || stopCalling === false) {
            let arr = [];
            imageResponse.map((data, _id) => {
                //check first index of img response and if were searching 
                arr.push(<GalleryImg key={_id} props={data}></GalleryImg>)
            });
    
            return arr;
        }
    }

    const renderLoader = () => {
        return(<Player
            className="loading"
            autoplay
            loop
            src="https://assets2.lottiefiles.com/private_files/lf30_hbmgptwa.json"></Player>)
    }
    
    useEffect(() => { 
        //every time search term updates
        //we wanna search and rerender
        if(searchTerm.length > 0 && searchFor) {
            //search
            setErrMsg("");
            searchImages();
        }
        console.log(lastId);
        if(lastId && stopCalling == false) {
            getMoreImages();
        }
        
    }, [searchTerm, imageResponse])

    const resetSearch = () => {
        myRef.current.value = "";
        setImageResponse([]);
        setErrMsg("")
        setLoaded(false);
        setSearchFor(false);
        setStop(false);
        clearGrid();
    }


    if(isLoaded == false && searchFor == false && stopCalling == false) {
        retrieveImages();        
    }

    return (
        <div className="galleryGrid">
            {errMsg.length > 0 ? renderError() : null}
            <div className="search">
                <form onSubmit={(e) => {e.preventDefault(); search(e)}}>
                    <input ref={myRef} type="text" name="search" id="searchInput" placeholder="Find your creature"/>
                    <input type="submit" value="Search" />
                    <input type="button" value="Show me everything!" onClick={(e) => {e.preventDefault(); resetSearch()}}/>
                </form>
            </div>
            <div className="grid" ref={gridContainer}>
                {imageResponse.length > 0 ? renderstuff() : renderLoader()}
            </div>
            
        </div>
    )
}

export default GalleryGrid;