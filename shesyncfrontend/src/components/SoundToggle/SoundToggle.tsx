import { useContext } from "react";
import "./SoundToggle.css";
import { MusicContext } from "../../context/MusicContext";

export default function SoundToggle() {
  const music = useContext(MusicContext);

  if (!music) return null;

  return (
    <button
      type="button"
      className={`soundToggle ${music.isOn ? "on" : ""}`}
      onClick={music.toggle}
      aria-label={music.isOn ? "Turn music off" : "Turn music on"}
    >
      <span className="soundToggleDot" />
    </button>
  );
}
