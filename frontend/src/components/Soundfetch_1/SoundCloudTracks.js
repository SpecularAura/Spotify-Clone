import React, { useEffect, useState } from 'react';
import { songsdata } from '../BottomBar/audios';
import Section from "./Section";

function Content() {
  // const [audio, setAudio] = useState(null);

  // const playAudio = () => {
  //   fetch('http://localhost:5000/stream')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.blob();
  //     })
  //     .then(data => {
  //       const audioUrl = URL.createObjectURL(data);
  //       const newAudio = new Audio(audioUrl);
  //       newAudio.play();
  //       setAudio(newAudio);
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // };

  // const pauseAudio = () => {
  //   if (audio) {
  //     audio.pause();
  //   }
  // };

  return (
    <div className='overflow-y-auto h-screen'>

      {/* <button onClick={playAudio}>Play Audio</button><br />
      <button onClick={pauseAudio}>Pause Audio</button> */}
	
		<div className="grid gap-y-8">
			<Section
				title="Recently played"
				more="/blabla"
				items={songsdata}
			/>
			<Section
				title="Shows to try"
				more="/blabla"
				items={songsdata}
			/>
			<Section
				title="Made For Tayfun Erbilen"
				more="/blabla"
				items={songsdata}
			/>
		</div>


    </div>
  );
}

export default Content;
