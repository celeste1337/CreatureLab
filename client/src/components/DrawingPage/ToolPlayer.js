import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function ToolPlayer() {
  const [src, setSrc] = useState("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
  const [tool, setTool] = useState(true);
  const [loaded, setLoaded] = useState(false);

  return (
    <div id="animDiv" onClick={() => {
      //console.log('clicked');
      setTool(!tool);
      if (tool) setSrc("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
      else setSrc("https://assets8.lottiefiles.com/packages/lf20_kgdnuo0z.json");
    }}>
      <Player
        // onEvent={event => {
        //   if (loaded === false && event === 'load') {
        //     setLoaded(true);
        //     //console.log(loaded);
        //   }
        // }}
        id="toolSwitch"
        autoplay
        loop="false"
        src={src}
        style={{ width: 50, height: 50 }}
      ></Player>
    </div>
  )
}