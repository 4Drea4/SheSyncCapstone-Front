import { useEffect, useState} from 'react';
import { getTasks } from '../../api/tasks';
import { getProjects} from '../../api/projects';
import type { Project, Task } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';
import SoundToggle from '../../components/SoundToggle/SoundToggle'
import TaskModal from '../../components/TaskModal/TaskModal';
import greenFlower from '/flowergreen.png';
import sheSyncLogo from '/logo.png';
import flower from '/flowerpink.png';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import './Dashboard.css';

export default function Dashboard() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);

    const  [showProjectModal, setShowProjectModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);

    //load projects

    useEffect(()=> {
    async function loadProjects(){
        const data = await getProjects();
        setProjects(data);
    }
    loadProjects();
},[]);

    

    //load the tasks when the project changes
    useEffect(()=> {
        async function loadTasks() {
            if (!selectedProjectId) {
                setTasks([]);
                return;
            }
            const data = await getTasks(selectedProjectId)
                setTasks(data);
            }
            loadTasks();
        }, [selectedProjectId]);

        //find the selected project
        const selectedProject = projects.find((p) => p._id === selectedProjectId) || null;


        function handleCreated(project:Project) {
            setProjects((prev) => [project, ...prev]);
            // auto select the new project in this list
            setSelectedProjectId(project._id);
        }
     
        function handleTaskCreated(task: Task) {
            setTasks((prev) => [task, ...prev]);
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
                Start here and create a Project 
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
                                {tasks.length === 0 ? (
                                    <p className='tasksInstructions'>No tasks yet!</p>
                                ) :(
                                    tasks.map((task) => (
                                        <div key={task._id} className='taskCard'>
                                            <h4>{task.title}</h4>
                                            {task.description && <p>{task.description}</p>}
                                            <span className='taskStatus'>{task.status}</span>
                                        </div>
                                    ))
                                )}
                               
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
                    

      