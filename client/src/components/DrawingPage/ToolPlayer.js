import React, { useState, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function ToolPlayer() {
  const [src, setSrc] = useState("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
  const [tool, setTool] = useState(true);
  const [frameCount, setFrameCount] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  let ref = useRef()

  return (
    <div className="sliderBack" onClick={() => {
      //console.log('clicked');

      ref.current.play();

      setAutoplay(true);
      
      setTool(!tool);
      if (tool) setSrc("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
      else setSrc("https://assets8.lottiefiles.com/packages/lf20_kgdnuo0z.json");

    }}>
      <Player
        ref={ref}
        onEvent={event => {
          //  if (event === 'complete') {
          //   this.pause();
          // } else
          if (event === 'frame') {
            console.log(frameCount);
            setFrameCount(frameCount+1);
          } 
          if (event === 'load') {
            console.log('loaded new. framecount is 0');
            setFrameCount(0);
          }
          if (frameCount === 362) {
            console.log('frame 362');
            ref.current.pause();
            setFrameCount(0);
          }
          
        }}
        id="toolSwitch"
        className="sliderFront"
        autoplay={autoplay}
        loop={false}
        src={src}
        style={{ width: 50, height: 50 }}
      ></Player>
    </div>
  )
}