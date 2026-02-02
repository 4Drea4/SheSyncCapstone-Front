import { useEffect, useState} from 'react';
import { getProjects} from '../../api/projects';
import type { Project } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';
import './Dashboard.css';
import sheSyncLogo from '/logo.png'
import flower from '/flowerpink.png'
import ProjectModal from '../../components/ProjectModal/ProjectModal';

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

            <header className="dashboardHeader">
                <img className='dashboardLogo' src={sheSyncLogo} alt="Sync Logo"/>

                <div className='dashboardSoundtrack'>
                    <span>Master Planning Sountrack →</span>

                {/* add my toggle here */}
                 </div>

                    <button className='logoutButton' type="button">Logout</button>
               
            </header>

            {/* main section */}
            <main className='dashboardMain'>
                <div className='dashboardHero'>
                    <h1 className="dashboardTitle">Hey girl!</h1> 

                    <span className="pinkFlower">
                            <img src={flower} alt ="Flower"/>
                        </span> 

                    <p className="dashboardMessage">
                    Want to get in {" "}
                    <span className="logo">
                            <img src={sheSyncLogo} alt ="She Sync Logo"/>
                        </span> ? <br/> 
                        Start here and create a 
                       {" "} 
                       <button 
                       type="button"
                       className="inlineProjectButton"
                       onClick={()
                        =>  setShowProjectModal(true)}>
                            New Project +
                        </button> { " "}
                       
                      then you can assign <em>tasks!</em>
                    </p>

                    <div className='dashboardSelectProject'>
                        <ProjectSelect
                        projects={projects}
                        selectedProjectId={selectedProjectId}
                        onSelect={setSelectedProjectId}
                        addNew={() => setShowProjectModal(true)}
                        />
                    </div>
                </div>
            </main>

            {showProjectModal && (
                // i didnt create the project modal yet
                <ProjectModal
                onClose={() => setShowProjectModal(false)}
                onCreated={handleCreated}
                />
                )}    
        </div>
    );
}