import { useEffect, useState} from 'react';
import { getProjects} from '../../api/projects';
import type { Project } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';
import './Dashboard.css';
import sheSyncLogo from '/logo.png'
import flower from '/flowerpink.png'
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import greenFlower from '/flowergreen.png'

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

                {/* add my toggle here */}
                <div className='soundToggle' aria-hidden='true'>
                    <div className='soundToggleDot'/>
                </div>
                </div>

                <button className='logoutButton' type="button">Logout</button>

            </header>

          <main className='dashboardMain'>
            <section className='dashboardHero'>
            <div className="mainRow">
                <h1 className="heroTitle">Hey girl!</h1>
                 <img className="pinkFlower" src={flower} alt ="Flower"/>
                 <h1 className="heroTitle">
                    Want to get in {" "}
                    <span className='heroLogoInline'>
                        <img src={sheSyncLogo} alt = "Sync Logo"/>
                    </span> {" "} ? 
                 </h1>
            </div>

            <div className='mainRow mainRowTwo'>
                <img className='greenFlower' src={greenFlower} alt="Flower"/>

                <h2 className='mainSubtitle'>
                    Start here and create a {" "}
                    <span className='inlineSelectWrap'>
                        <ProjectSelect
                        projects={projects}
                        selectedProjectId={selectedProjectId}
                        onSelect={setSelectedProjectId}
                        addNew={() =>  setShowProjectModal(true)}
                        />
                    </span>
                    </h2>
                    </div>

                    <h2 className='mainSubtitle mainSubtitleLast'>
                        then you can assign <em>tasks!</em>

                    </h2>
                    </section>
                    </main>
        {showProjectModal && (
            <ProjectModal
            onClose={() => setShowProjectModal(false)}
            onCreated={handleCreated}
            />
        )}
        </div>
    );
}
                    

      