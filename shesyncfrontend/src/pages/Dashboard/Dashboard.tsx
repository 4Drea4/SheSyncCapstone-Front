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
import TaskModal from '../../components/TaskModal/TaskModal';
import { getTasks } from '../../api/tasks';

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const  [showProjectModal, setShowProjectModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);



    //load projects

    useEffect(()=> {
    async function load(){
        const data = await getProjects();
        setProjects(data);
    }
    load();
},[]);

    //find the selected project

    const selectedProject = projects.find((p) => p._id === selectedProjectId) || null;


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
                    <span className='soundtrackText'>Master Planning Sountrack →</span>
                   
                <SoundToggle/>
                </div>

                <button className='logoutButton' type="button">Logout</button>

            </header>

          <main className='dashboardMain'>
            <section className='dashboardHero'>

            <div className="mainRow">
                <span className="mainText">Hey girl!</span>

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
                <span className='inlineSelectWrap'>
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
                <img className="pinkFlower" src={greenFlower} alt =" Green Flower"/>
                    <span className='mainText'>
                        then you can assign <em>tasks!</em>
                    </span>
                </div>

                {/* tasks */}
                <section className='tasksArea'>
                    {!selectedProjectId ? (
                        <p className='tasksInstructions'>
                            Select your project, to see your tasks
                        </p>
                    ):(
                        <div>
                            <div className='tasksHeader'>
                                <h3 className='tasksTitle'>Tasks{selectedProject ? ` for "${selectedProject.name}"`: ""}  </h3>
                                <button className='tasksAddButton' 
                                type='button'
                                
                                onClick={()=> setShowTaskModal(true)}>
                                    + New Task
                                </button>
                            </div>
                            <div className='tasksList'>
                                <p className='tasksInstructions'>
                                    Your tasks for your project will be right here!
                                </p>
                            </div>
                        </div>

                    )}
                </section>
                </section>
                </main>

            {showProjectModal && (
                <ProjectModal
                onClose={() => setShowProjectModal(false)}
                onCreated={handleCreated}
            />
            )}
            {showTaskModal && selectedProjectId && (
                <TaskModal
                projectId={selectedProjectId}
                onClose={() => setShowTaskModal(false)}
                onCreated={(task) =>  {
                    console.log("Created task", task);
                }}
                />
            )}
                
        </div>
    );
}
                    

      