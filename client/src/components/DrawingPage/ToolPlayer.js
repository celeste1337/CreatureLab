import React, { useEffect, useRef, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

export default function ToolPlayer() {
  const [src, setSrc] = useState("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
  const [tool, setTool] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // const createInteractivity = () => {
  //   const animDiv = document.getElementById("animDiv");

  //   //if(loaded) return false;
  //   animDiv.addEventListener('click', () => {
  //     let newTool = !tool;
  //     setTool(newTool);
  //     console.log(tool);

  //     if (tool) setSrc("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
  //     else setSrc("https://assets8.lottiefiles.com/packages/lf20_kgdnuo0z.json");
  //   })
  // };

  // const anim = document.getElementById("toolSwitch");
  // console.log(anim);

  // anim.addEventListener("enterFrame", function (animation) {
  //   if (animation.currentTime > (anim.totalFrames - 1)) {
  //     anim.pause();
  //   }
  // });

  return (
    <div id="animDiv" onClick={() => {
      console.log('clicked');
      setTool(!tool);
      if (tool) setSrc("https://assets1.lottiefiles.com/packages/lf20_evz9joti.json");
      else setSrc("https://assets8.lottiefiles.com/packages/lf20_kgdnuo0z.json");
    }}>
      <Player
        onEvent={event => {
          if (loaded === false && event === 'load') {

            setLoaded(true);
            console.log(loaded);
            //createInteractivity();
          }
        }}
        id="toolSwitch"
        autoplay
        loop="false"
        src={src}
        style={{ width: 50, height: 50 }}
      ></Player>
    </div>
  )
}

// const createInteractivity = () => {
//   const player = document.getElementById("toolSwitch");
//   console.log(player);
//   create({
//     player: "#toolSwitch",
//     mode: "chain",
//     actions: [
//       {
//         state: 'click',
//         forceFlag: true,
//         path: "https://assets1.lottiefiles.com/packages/lf20_evz9joti.json",
//         transition: 'click',
//         count: 1
//       },
//       {
//         path: 'https://assets9.lottiefiles.com/packages/lf20_kgdnuo0z.json',
//         state: 'click',
//         transition: 'click'
//       }
//     ]
//   });
