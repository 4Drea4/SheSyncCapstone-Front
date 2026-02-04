import {Link} from "react-router-dom";
import './Landing.css';
import sheSyncLogo from '/logo.png';
import landingVideo from "/landing-video.mp4";

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
                <h1 className="landingHeadline">
                    Have a lot to do?
                </h1>

                <p className="landingsubText">
                    Don't set another reminder
                </p>
                <div className="landingSyncLine">
                    <span>Get in</span>
                    <img src={sheSyncLogo} alt="She Sync Logo"/>

                </div>
                <Link to="/register" className="calltoAction">Join the Cult</Link>
            </div>
        </div>
    );
}