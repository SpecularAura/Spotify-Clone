import React, { useRef } from "react";
import "./player.scss";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import churchTransform from "../../helpers/changeVoice";
import audioBufferToWaveBlob from "../../helpers/audioBufferToWaveBlob";
import megaphoneTransform from "../../helpers/megaphoneTransform";

const Player = ({
  audioElem,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const changeVoice = async () => {
    const arrayBuffer = await (await fetch(currentSong?.url)).arrayBuffer();
    let ctx = new AudioContext();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    let outputAudioBuffer = await megaphoneTransform(audioBuffer);
    let outputWavBlob = await audioBufferToWaveBlob(outputAudioBuffer);
    let audioUrl = window.URL.createObjectURL(outputWavBlob);
    setCurrentSong({
      id: Math.floor(Math.random() * 100),
      title: "Modified Voice",
      description: "Original Soundtrack",
      artist: "Me",
      image: "https://i.scdn.co/image/ab67706c0000da84fcb8b92f2615d3261b8eb146",
      type: "album",
      url: audioUrl,
    });
  };

  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div
            className="seek_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isPlaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill className="btn_action" onClick={skiptoNext} />
      </div>
      <button onClick={changeVoice}>Click to change voice</button>
    </div>
  );
};

export default Player;
