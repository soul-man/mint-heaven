import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

export interface soundOnProps {
  isPlaying: boolean;
}

export default function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound('/music/airdrop.m4a');

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }

  }, [duration, isPlaying, play]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec: sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const SoundOnIcon: React.FC<soundOnProps> = (props) => {
    return (
      <div className="pr-2">
        <div className="flex flex-shrink-0 items-end justify-between h-4 w-[20px]">
          <div className={'block w-[5px] flex-shrink-0 origin-bottom rounded-full bg-blue-500 transition-all duration-100 ease-in-out h-5 ' + (props.isPlaying && 'animate-[playPulse_0.5s_ease-in-out_-0.2s_infinite_alternate]')}></div>
          <div className={'block w-[5px] flex-shrink-0 origin-bottom rounded-full bg-blue-600 transition-all duration-100 ease-in-out h-5 ' + (props.isPlaying && 'animate-[playPulse_0.35s_ease-in-out_-0.5s_infinite_alternate]')}></div>
          <div className={'block w-[5px] flex-shrink-0 origin-bottom rounded-full bg-blue-700 transition-all duration-100 ease-in-out h-5 ' + (props.isPlaying && 'animate-[playPulse_0.65s_ease-in-out_-0.7s_infinite_alternate]')}></div>
        </div>
      </div>
    );
  }

  return (

    <div className="relative flex flex-row items-center gap-5 hover:scale-105 duration-300 opacity-70 hover:opacity-100">

      <div className='px-2 py-1 flex flex-row gap-3 items-center rounded-lg z-10 bg-black/30'>

        <div className="flex items-center">
          {/* <button className="playButton hover:scale-125 duration-200">
              <IconContext.Provider value={{ size: "1.8em", color: "#6d97f0" }}>
              <BiSkipPrevious />
              </IconContext.Provider>
          </button> */}
          {!isPlaying ? (
              <button className="playButton text-3xl text-blue-500 hover:scale-125 duration-200" onClick={playingButton}>
                <AiFillPlayCircle />
              </button>
          ) : (
              <button className="playButton text-3xl text-blue-500 hover:scale-125 duration-200" onClick={playingButton}>
                <AiFillPauseCircle />
              </button>
          )}
          {/* <button className="playButton hover:scale-125 duration-200">
              <IconContext.Provider value={{ size: "1.8em", color: "#6d97f0" }}>
              <BiSkipNext />
              </IconContext.Provider>
          </button> */}
        </div>

        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-2'>
            <div className="text-[12px] mb-[0px]">
                Lil Bubble - Airdrop
            </div>
            <a href="" target="_blank" className="hover:scale-112">
              <TbExternalLink className="text-blue-300/90 group-hover:scale-125" />
            </a>

            
          </div>

          <div className="flex flex-row justify-between !leading-[1rem] gap-1">
            <div className="text-[12px] mb-[0px] w-8">
              {currTime.min}:{currTime.sec}
            </div>
            <div>
              <input
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                className="timeline range accent-red-500 w-20"
                onChange={(e) => {
                  sound.seek([e.target.value]);
                }}
              />
            </div>
            <div className="text-[12px] w-8">
              {time.min}:{time.sec}
            </div>
          </div>


        </div>

        <SoundOnIcon isPlaying={isPlaying} />


      </div>

    </div>



  );
}
