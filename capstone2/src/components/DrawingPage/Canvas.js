import React, {useState, useRef, useEffect} from 'react';

function Canvas(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        //useEffect is a react hook that runs after the component mounts or when stuff changes basically (kinda like onload?)
        //the array as second param just says get the reference at component did mount, not every time the component changes
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    }, [])


    //mouse functions

    return(
        <canvas ref={canvasRef} style={{border: "1px solid black"}}></canvas>
    );
}

export default Canvas;