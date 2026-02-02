import { useEffect, useState} from 'react';
import { getProjects} from '../../api/projects';
import type { Project } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';

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
            <div className='dashboardTop'>
                <h1 className='dashboardTitle'>Project Management Bestie</h1>
                <ProjectSelect
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelect={setSelectedProjectId}
            addNew={()=> setShowProjectModal(true)}
            />
            </div>
           
            {showProjectModal && (
                // i didnt create the project modal yet
                <button onClick={()=> setShowProjectModal(false)}>Close This</button>
            )}
        </div>
    )
}