import {Link} from "react-router-dom";
import './Landing.css';
import sheSyncLogo from '/logo.png';
import landingVideo from "/landingVideo.mp4";

export default function Landing(){
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
                    Don't set another reminder<br></br>
                    Get in
                </p>
                
                    <span>
                    <img src={sheSyncLogo} className="logo" alt="She Sync Logo"/></span>

                {/* </div> */}
                <Link to="/register" className="calltoAction">Join the Cult</Link>
            </div>
        </div>
    );
}