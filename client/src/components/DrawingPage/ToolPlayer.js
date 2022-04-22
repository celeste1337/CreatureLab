import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function ToolPlayer() {
  const [src, setSrc] = useState("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
  const [tool, setTool] = useState(true);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="sliderBack" onClick={() => {
      //console.log('clicked');
      setTool(!tool);
      if (!tool) setSrc("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
      else setSrc("https://assets8.lottiefiles.com/packages/lf20_kgdnuo0z.json");
    }}>
      <Player
        // onEvent={event => {
        //   if (event === 'complete') {
        //     this.pause();
        //   }
        // }}
        id="toolSwitch"
        className="sliderFront"
        autoplay
        
        loop={false}
        src={src}
        style={{ width: 50, height: 50 }}
      ></Player>
    </div>
  )
}