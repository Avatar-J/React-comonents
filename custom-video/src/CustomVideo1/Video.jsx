import { useRef, useState } from "react";
import "./Video.css"
import {FaPause} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"
import {BiVolumeMute} from "react-icons/bi"
import {BiVolumeLow} from "react-icons/bi";
import {IoMdSkipForward} from "react-icons/io";
import {IoMdSkipBackward} from "react-icons/io";
import poster from "./Video-Marketing.jpg"



function Video(){

    const videoRef = useRef();
    const bufferRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);

    //if video is loading from server, the loading animation shows 
    const [isLoading, setIsLoading] = useState(true)

    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0)

    //play and pause video
    const playAndPause=()=>{
        if(isPlaying){
            videoRef.current.pause();
            // setIsPlaying(false)
        }
        else{
            videoRef.current.play();
            // setIsPlaying(true)          
        }
        setIsPlaying(!isPlaying)
    }

    //formating the time from current time and duration
    //formatting time and utils are utilities
    const formatTime = (duration) => {
        const one_sec = 60;
        const minutes = Math.floor(duration/one_sec);
        const seconds = Math.floor(duration - (minutes * one_sec));

        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}` 
        return formattedTime;
    }

    const padZero = (time) =>{
        if(time < 10){
            return `0${time}`
        }
        else return time
    }

    //rewind and forward skip
    const rewindHandler = () => {
        videoRef.current.seekTo(videoRef.current.CurrentTime() - 10 )
    }

    //fast forward handler
    const fastForwardHandler = () => {
        videoRef.current.seekTo(videoRef.current.CurrentTime() + 10 )
    }

    return(
        <>
        <div className="video-container">

                <div className="video-header">JUMMAI'S CUSTOM VIDEO</div>

            <div className="video-wrapper">

        

                    {/* source tag did not work for some reason and the video was only resized when i put the styling in tag*/}
                    <video 
                    poster={poster}
                    onCanPlayThrough={()=>{
                        setIsLoading(false);
                        setVideoDuration(videoRef.current.duration)
                    }}
                    onClick={playAndPause}
                    onTimeUpdate={()=>{setCurrentTime(videoRef.current.currentTime)}}
                    onEnded={()=> setIsPlaying(false)}
                    onWaiting={()=>setIsLoading(true)}
                    preload='metadata'
                    ref={videoRef}
                    className="video" 
                    // style={{width: "90%", maxWidth: "1000px", height: "400px"}} 
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                    type='video/mp4'/>

                    {/* control will be on overlay */}

                      {/* <div className=".video-overlay"> */}

                        <div className="video-controls">

                        <div>{formatTime(currentTime)}/{formatTime(videoDuration)}</div>
                        <div>{isLoading? "loading": ""}</div>

                            <div className="progress-bar">
                                <div 
                                className= {`inner-progress-bar ${currentTime !== videoDuration? "":"restart-progress-bar"}`}
                                style={{
                                    animationPlayState: isPlaying? "running" : "paused",
                                    animationDuration: isLoading?  "0s": `${videoRef.current.duration}s`
                                }}
                                ></div>
                            </div>


                            <button className="control-button" onClick={rewindHandler}>
                                 <IoMdSkipBackward />
                                
                            </button>

                            <button className="control-button" onClick={playAndPause}>
                                 
                                {isPlaying? <FaPause size="1.5rem"/> : <FaPlay/>}
                                
                            </button>

                            <button className="control-button" onClick={fastForwardHandler}>
                                 
                                <IoMdSkipForward />
                            </button>
                        {/* </div>  */}
                       

                    </div>
            </div>
        </div>
        </>
    )
}

export default Video;