import { useEffect, useState} from 'react';
import { getProjects} from '../../api/projects';
import type { Project } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';
import './Dashboard.css';
import sheSyncLogo from '/logo.png'
import flower from '/flowerpink.png'
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import greenFlower from '/flowergreen.png'
import SoundToggle from '../../components/SoundToggle/SoundToggle'

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const  [showProjectModal, setShowProjectModal] = useState(false);

    useEffect(()=> {
    async function load(){
        const data = await getProjects();
        setProjects(data);
    }
    load();
},[]);

        function handleCreated(project:Project) {
            setProjects((prev) => [project, ...prev]);
            // auto select the new project in this list
            setSelectedProjectId(project._id);
        }

    return (
        <div className='dashboardPage'>
            <header className='dashboardHeader'>
                <img className='dashboardLogo' src={sheSyncLogo} alt ="sync logo"/>

                <div  className='dashboardSoundtrack'>
                    <span>Master Planning Sountrack →</span>
                <SoundToggle/>
                <div className='soundToggle' aria-hidden='true'>
                    <div className='soundToggleDot'/>
                </div>
                </div>

                <button className='logoutButton' type="button">Logout</button>

            </header>

          <main className='dashboardMain'>
            <section className='dashboardHero'>
            <div className="mainRow">
                <h1 className="mainText">Hey girl!</h1>
                 <img className="pinkFlower" src={flower} alt ="Flower"/>
                 <span className="mainText">
                 Want to get in {" "}
             
                    <span className='heroLogoInline'>
                        <img src={sheSyncLogo} alt = "Sync Logo"/>
                    </span> {" "} ? 
                    </span>
            </div>

            <div className='mainRow mainRowTwo'>
                <span className='mainText'>
                Start here and create a {" "}
                <ProjectSelect
                        projects={projects}
                        selectedProjectId={selectedProjectId}
                        onSelect={setSelectedProjectId}
                        addNew={() =>  setShowProjectModal(true)}
                        />
                </span>
                </span>
                </div>

                <div className="mainRow mainRowThree">
                    <span className='mainText'>
                        then you can assign <em>tasks!</em>
                    </span>
                </div>
                </section>
                </main>

                
        </div>
    );
}
                    

      