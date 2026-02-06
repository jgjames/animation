import { useRef, useState, useEffect } from "react";
import ultraflysfx from "/ultrafly.mp3";
import ultraflypng from "/ultrafly.png";
// import redspace from "/red_space.jpg";

function Intro() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false); // whether animation has been triggered

  async function handleStart() {
    // user gesture: start animation and play audio after 0.5s delay
    setStarted(true);
    timerRef.current = window.setTimeout(async () => {
      try {
        await audioRef.current?.play();
      } catch {
        /* ignore if autoplay is blocked */
      }
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="intro h-screen w-screen overflow-hidden flex justify-center items-center">
      {/* <img src={redspace} alt="red eclipse in space" className="bg-img" /> */}

      <img
        src={ultraflypng}
        alt="Ultraman in a flying pose with his right fist raised and facing the screen"
        className={"ultrafly" + (started ? " play" : "")}
      />
      <audio ref={audioRef} src={ultraflysfx} preload="auto" playsInline />

      {!started && (
        <button
          className="play-overlay"
          onClick={handleStart}
          aria-label="Start animation and audio"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default Intro;
