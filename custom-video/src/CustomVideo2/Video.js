import React, { useRef, useState, useEffect } from "react";
import "./Video.css"

import {MdReplay10} from "react-icons/md"
import {MdForward10} from "react-icons/md"
import {MdPause} from "react-icons/md"
import {MdPlayArrow} from "react-icons/md"
import {MdFullscreen} from "react-icons/md"
import {MdFullscreenExit} from "react-icons/md"
import {MdVolumeUp} from "react-icons/md"
import {MdVolumeOff} from "react-icons/md"


export default function Video(){

    const videoRef = useRef();
    const progressRef = useRef();

    const speeds = [ 1, 1.5, 2, 0.5];

    const [isplaying, setIsPlaying] = useState(false); 
    const [fullscreen, setFullScreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //play and pause
    const playPauseHandler =()=>{
        isplaying? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isplaying)
    }

    const RewindHandler =()=> {
        videoRef.current.currentTime -= 10;
      }
    const ForwardHandler =()=> {
        videoRef.current.currentTime += 10;
      }  

     //fullscreen
     const fullScreenHandler = ()=>{
    const element = videoRef.current;
    if (!fullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
     } 
     else if(fullscreen){
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
     }
     setFullScreen(!fullscreen);
    }

    //progess bar
    const ProgressBarTimeUpdateHandler = ()=>{
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }

    //draggable seek bar functions
    const MouseDownHandler = (event) =>{
      setIsSeeking(true);
      HandleDraggableSeekBar(event);
    }
    const MouseUpHandler = () =>{
      setIsSeeking(false);
    }
    const MouseMoveHandler = (event) =>{
      if(isSeeking){
        HandleDraggableSeekBar(event);
      }
    }
    const HandleDraggableSeekBar = (event) =>{
      const seekBar = progressRef.current;
      const seekPosition = (event.clientX - seekBar.offsetLeft) / seekBar.offsetWidth;
      videoRef.current.currentTime = seekPosition * videoRef.current.duration;
    }

     //handles the keyboard inputs
    const handleKeyPress =(event)=> {
        if (event.code === 'Space' || event.code === 'KeyK') {
            playPauseHandler();
        }
        if (event.code === 'ArrowLeft') {
            RewindHandler();
          }
        if (event.code === 'ArrowRight') {
            ForwardHandler();
          }  
      }    


      useEffect(() => {

        function handleMouseMove(event) {
          HandleDraggableSeekBar (event);
        }

        if (isSeeking) {
          window.addEventListener('mousemove', handleMouseMove);
        } else {
          window.removeEventListener('mousemove', handleMouseMove);
        }
        
        //videoRef.current.addEventListener('keydown', handleKeyPress);
        // videoRef.current.addEventListener('timeupdate', ProgressBarTimeUpdateHandler);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          //videoRef.current.removeEventListener('keydown', handleKeyPress);
          // videoRef.current.removeEventListener('timeupdate', ProgressBarTimeUpdateHandler)
        };
      }, [videoRef, progressRef, isSeeking]);

    return(
        <>
        <div className="video-container">
            <video
            onTimeUpdate={ProgressBarTimeUpdateHandler}
            onKeyDown={handleKeyPress}
            controls={false}
            ref={videoRef}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />

            <div className="video-controls-container">
                <div className="progress-bar" ref={progressRef} onMouseDown={MouseDownHandler} onMouseUp={MouseUpHandler}>
                  <div className="inner-progress-bar" style={{width: `${progress}%`}}>

                  </div>
                </div>

                <div className="controls">
                    <button onClick={RewindHandler}>
                        <MdReplay10/>
                    </button>

                   <button onClick={playPauseHandler}>
                    {isplaying? <MdPause/>:<MdPlayArrow/> }
                    </button>

                    <button onClick={ForwardHandler}>
                        <MdForward10/>
                    </button>

                    <button onClick={fullScreenHandler}>
                       {fullscreen? <MdFullscreenExit/>:<MdFullscreen/>} 
                    </button>

                      
                </div> 
                

            </div>

        </div>
        </>
    )
}

