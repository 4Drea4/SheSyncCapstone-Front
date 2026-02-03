import { useState } from "react"
import './SoundToggle.css'

export default function SoundToggle(){
    const [isOn, setIsOn] = useState(true);
    function toggleSound(){
        setIsOn((prev) => !prev);

    }
    return (
        <button
        type="button"
        className={`soundToggle ${isOn ? "on" : "off"}`}
        onClick={toggleSound}
        aria-label="Toggle soundtrack">
            <span className="soundToggleDot"/>
        
        </button>
    )
//     const Controls = () => {
//         const [isPlaying, setIsPlaying] = useState(false);
//         return (
//             <button>
//           {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
//         </button>
//         <button></button>
//         <button onClick={togglePlayPause}>
//   {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
// </button>

}
