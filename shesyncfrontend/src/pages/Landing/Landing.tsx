import './Landing.css';
import sheSyncLogo from '/logo.png';
import landingVideo from "/landingVideo.mp4";
import { useNavigate } from 'react-router-dom';

export default function Landing(){
const navigate = useNavigate();

    return (
        <div className="landingPage">
            <video
            className="landingVideo"
            autoPlay
            loop
            muted
            playsInline
            >
                <source src={landingVideo} type="video/mp4"/>
            </video>

            <div className="landingText">
                <h1 className="landingHero">
                    Have a lot to do?
                </h1>

                <p className="landingCommand">
                    {/* Don't set another reminder<br/> */}
                    Get in {" "}
                     <span>
                        <img src={sheSyncLogo} className='logo' alt="She Sync Logo"/>
                        </span>
                </p>
                
                    

                {/* </div> */}
                <button className="calltoAction"
                onClick={()=> navigate("/register")}>Join the Cult</button>
            </div>
        </div>
    );
}